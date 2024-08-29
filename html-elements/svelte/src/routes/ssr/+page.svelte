<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div>
    {#each data.players as player}
        <div>
            <span>{player.name}</span>
            <span>{player.score}</span>
        </div>
    {/each}
</div>
