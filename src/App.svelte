<internal-box>
	{#each new Array(10) as _, i}
		<internal-text color="cyan">
			<internal-text color="green">✔︎</internal-text>
			{#if i % 2 === 0}
				<internal-text color="blue">even</internal-text>
			{:else}
				odd
			{/if}
		</internal-text>
	{/each}
</internal-box>
