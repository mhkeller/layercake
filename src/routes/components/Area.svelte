<script>
  import { getContext } from 'svelte';

  const { data, xGet, yGet, xScale, yScale, extents } = getContext('LayerCake');

  export let fill = '#ab00d610';

  $: path = 'M' + $data
    .map(d => {
      return $xGet(d) + ',' + $yGet(d);
    })
    .join('L');

  let area;

  $: {
    const yRange = $yScale.range();
    area = path + (
      'L' + $xScale($extents.x ? $extents.x[1] : 0) + ',' + yRange[0] +
      'L' + $xScale($extents.x ? $extents.x[0] : 0) + ',' + yRange[0] +
      'Z'
    );
  }
</script>

<path class='path-area' d='{area}' {fill}></path>