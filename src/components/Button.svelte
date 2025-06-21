<script lang="ts">
    let { title, url }: { title: string, url: string } = $props();
</script>

<button class="button" onclick={() => window.open(url, "_blank")}>
    <span>{title}</span>
</button>

<style lang="scss">
    .button {
        display: flex;
        width: 200px;
        height: 57px;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: none;
        font-size: 1.6rem;
        cursor: pointer;
        border-radius: 16px;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .button:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
    .button:active {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transform: translateY(2px);
    }
    span {
        color: #9A0100;
        font-weight: bold;
        font-family: "Overused Grotesk", sans-serif;
    }
</style>