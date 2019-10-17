<template>
  <div class="loading">
      <div class="spinner">
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="#777777" stroke-width="6" fill="#eeeeee" />
        </svg> 
        </div>
  </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style scoped>
.loading {
    width: 100vw;
    height: 100vh;
    background-color:#eeeeee;
    position: relative;
}

.spinner {
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

svg {
  stroke-dasharray: 200; /* (2PI * 40px) */
  animation: rotate 1s linear forwards infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg)
  }
}

</style>>
