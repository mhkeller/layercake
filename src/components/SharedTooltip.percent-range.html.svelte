<!--
	@component
	Generates a tooltip that works on multiseries datasets, like multiline charts. It creates a tooltip showing the name of the series and the current value. This version uses percentages so you can use it to render server-side. It finds the nearest data point using the [QuadTree.percent-range.html.svelte](https://layercake.graphics/components/QuadTree.percent-range.html.svelte) component.
 -->
<script>
  import { getContext } from 'svelte';
  import { format } from 'd3-format';

  import QuadTree from './QuadTree.percent-range.html.svelte';

  const { data, width, yScale, config } = getContext('LayerCake');

  const commas = format(',');
  const titleCase = d => d.replace(/^\w/, w => w.toUpperCase());

	/** @type {Function} [formatTitle=d => d] – A function to format the tooltip title, which is `$config.x`. */
  export let formatTitle = d => d;

	/** @type {Function} [formatKey=d => titleCase(d)] – A function to format the series name. */
  export let formatKey = d => titleCase(d);

	/** @type {Function} [formatValue=d => isNaN(+d) ? d : commas(d)] – A function to format the value. */
  export let formatValue = d => isNaN(+d) ? d : commas(d);

	/** @type {Number} [offset=-20] – A y-offset from the hover point, in pixels. */
	export let offset = -20;

	/** @type {Array} [dataset] – The dataset to work off of—defaults to $data if left unset. You can pass something custom in here in case you don't want to use the main data or it's in a strange format. */
	export let dataset = undefined;

  const w = 150;
  const w2 = w / 2;
  let top = 0;

	/* --------------------------------------------
	 * Sort the keys by the highest value
	 */
  function sortResult(result) {
    if (Object.keys(result).length === 0) return [];
    const rows = Object.keys(result).filter(d => d !== $config.x).map(key => {
      return {
        key,
        value: result[key]
      };
    }).sort((a, b) => b.value - a.value);

    return rows;
  }
</script>

<style>
	.tooltip {
		position: absolute;
		font-size: 13px;
		pointer-events: none;
		border: 1px solid #ccc;
		background: rgba(255, 255, 255, 0.85);
		transform: translate(-50%, -100%);
    padding: 5px;
    z-index: 15;
  }
  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px dotted #666;
    pointer-events: none;
  }
  .tooltip,
  .line {
    transition: left 250ms ease-out, top 250ms ease-out;
  }
  .title {
    font-weight: bold;
  }
  .key {
    color: #999;
  }
</style>

<QuadTree
  dataset={dataset || $data}
  y='x'
  let:x
  let:y
  let:visible
  let:found
  let:e
>
  {#if visible === true}
    <div
      style="left:{(x / 100) * $width }px;"
      class="line"></div>
    <div
      class="tooltip"
      style="
        width:{w}px;
        display: { visible ? 'block' : 'none' };
        top:calc({$yScale(sortResult(found)[0].value)}% + {offset}px);
        left:{Math.min(Math.max(w2, (x / 100) * $width), $width - w2)}px;"
      >
        <div class="title">{formatTitle(found[$config.x])}</div>
        {#each sortResult(found) as row}
          <div class="row"><span class="key">{formatKey(row.key)}:</span> {formatValue(row.value)}</div>
        {/each}
    </div>
  {/if}
</QuadTree>

