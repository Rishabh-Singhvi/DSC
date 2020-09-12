<template>
  <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.png"
                    style="height: 5vh"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template v-if="!$store.state.logged" slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a @click="$router.push('/register')" class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a @click="$router.push('/login')"  class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
        <template v-else slot="end">
            <b-navbar-item tag="span">
                {{ $store.state.user.name }}
            </b-navbar-item>
        </template>
    </b-navbar>
</template>


<script>

</script>