<template>
  <header>
    Kavout Kazh
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/history">History</router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: var(--header-height);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--bulma-border);
  background: var(--bulma-background);

  nav {
    display: flex;
    justify-content: space-around;
    gap: 10px;

    .router-link-active {
      text-decoration: underline;
      color: var(--bulma-link-text);
    }
  }
}
</style>
