<template>
  <div>
    <nav>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <router-link to="/">
            <a class="btn btn-ghost text-xl">LGS</a>
          </router-link>
        </div>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup lang="ts">
</script>