<script lang="ts">
    let circle: HTMLElement;
</script>

<div id="circle" bind:this={circle}>
    <div id="rect-container">
        <span class="rect"></span>
        <span class="rect"></span>
        <span class="rect"></span>
    </div>
</div>

<style lang="scss">
    #circle {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        border-radius: 50%;
        position: relative;

        #rect-container {
            display: flex;
            align-items: end;
            gap: 0.5px;

            .rect {
                width: 4px;
                height: 10px;
                background-color: black;
                border-radius: 100px;

                animation: bounce 2.2s ease infinite alternate;
                transform-origin: bottom;
            }

            span {
                &:nth-of-type(2) {
                    animation-delay: -2.2s
                }

                &:nth-of-type(3) {
                    animation-delay: -3.4s
                }
            }
        }
    }

    @keyframes bounce {
        10% {
            transform: scaleY(0.7);
        }

        30% {
            transform: scaleY(1); 
        }

        60% {
            transform: scaleY(0.5);
        }

        80% {
            transform: scaleY(0.75);
        }

        100% {
            transform: scaleY(0.6);
        }
    }
</style>