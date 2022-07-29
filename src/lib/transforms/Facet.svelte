<!--
  @component
  Facets your data by the values in the given column
	and render small multiples
	Returns as slot props
		* {String} [groupKey] The key of each group
		* {Array} [groupData] The data in each group
 -->
<script>
	import { groups } from 'd3-array';

	/** @type {Array} [data] The data to be faceted. */
	export let data;
	/** @type {String} [by] - The field name to facet by */
	export let by;
	/** @type {String} [orientation='column'] - Can be 'column' or 'row'. Whether to arrange the faceted charts by row or column. This is passed to `flex-direction` on the parent container. */
	export let orientation = 'column';

	$: dataGroups = groups(data, d => d[by]);
</script>

<div
	class="facet-chart-container-parent"
	style:flex-direction={orientation}
	style="width:100%;height:100%;display:flex;"
	>
	{#each dataGroups as [groupKey, groupData]}
		<div class="facet-chart-container" style="flex:1;">
			<slot
				{groupKey}
				{groupData}
			/>
		</div>
	{/each}
</div>
