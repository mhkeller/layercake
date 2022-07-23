<script>
	import { groups } from 'd3-array';
	export let data;
	export let by;

	export let orientation = 'row';

	const dataGroups = groups(data, d => d[by]);
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
			></slot>
		</div>
	{/each}
</div>

