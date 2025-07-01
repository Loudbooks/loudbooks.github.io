<div id="circle">
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

    position: relative;

    #rect-container {
      display: flex;
      align-items: end;

      .rect {
        width: 15px;
        height: 30px;
        background-color: white;

        animation: bounce 2.2s ease infinite alternate;
        transform-origin: bottom;
        
        @media (max-width: 1050px) {
          width: 10px;
          height: 20px;
        }
      }

      span {
        &:nth-of-type(2) {
          animation-delay: -2.2s;
        }

        &:nth-of-type(3) {
          animation-delay: -3.4s;
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
