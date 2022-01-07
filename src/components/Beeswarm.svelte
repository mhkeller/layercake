<!--
	@component
	Generates an SVG Beeswarm chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, zGet, height, config, custom } = getContext('LayerCake');

	/** @type {Number} [r=3] – The circle radius size in pixels. */
	export let r = 3;

	/** @type {Number} [strokeWidth=0] – The circle's stroke width in pixels. */
	export let strokeWidth = 0;

	/** @type {String} [stroke='#fff'] – The circle's stroke color. */
	export let stroke = '#fff';

	/** @type {Number} [spacing=1.5] – Whitespace padding between each circle, in pixels */
	export let spacing = 1.5;

	$: circles = dodge($data, { rds: r * 2 + spacing + strokeWidth, x: $xGet });

	function dodge(data, { rds = 1, x = d => d } = {}) {
	  const radius2 = rds ** 2;
	  const circles = data.map(d => ({ x: x(d), [$config.z]: d[$config.z], data: d })).sort((a, b) => a.x - b.x);
	  const epsilon = 1e-3;
	  let head = null, tail = null;

	  // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
	  function intersects(x, y) {
	    let a = head;
	    while (a) {
	      if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
	        return true;
	      }
	      a = a.next;
	    }
	    return false;
	  }

	  // Place each circle sequentially.
	  for (const b of circles) {

	    // Remove circles from the queue that can’t intersect the new circle b.
	    while (head && head.x < b.x - radius2) head = head.next;

	    // Choose the minimum non-intersecting tangent.
	    if (intersects(b.x, b.y = 0)) {
	      let a = head;
	      b.y = Infinity;
	      do {
	        let y = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
	        if (y < b.y && !intersects(b.x, y)) b.y = y;
	        a = a.next;
	      } while (a);
	    }

	    // Add b to the queue.
	    b.next = null;
	    if (head === null) head = tail = b;
	    else tail = tail.next = b;
	  }

	  return circles;
	}
</script>

<g class='bee-group'>
	{#each circles as d}
		<circle
			fill={$zGet(d)}
			stroke='{stroke}'
			stroke-width='{strokeWidth}'
			cx='{d.x}'
			cy='{$height - r - spacing - strokeWidth / 2 - d.y}'
			r='{r}'
		>
			<title>{$custom.getTitle(d)}</title>
		</circle>
	{/each}
</g>
