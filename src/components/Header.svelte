<div id="header">
    <a href="/">home</a>
    <a href="/projects">projects</a>
</div>

<style lang="scss">
    #header {
        display: flex;
        gap: 30px;
        padding: 15px;
        padding-left: 23px;
        padding-right: 23px;
        position: absolute;
        z-index: 4;
        left: 50%;
        top: 0;

        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top: none;

        transform: translateX(-50%);
    }

    a {
        color: white;
        font-family: 'Visby';
        font-size: 20px;

        &:hover {
            cursor: pointer;
        }
    }
</style>