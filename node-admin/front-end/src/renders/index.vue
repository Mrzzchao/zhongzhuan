<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'index',

        created () {
            this.ajax.get(this.api.userAutoLogin, {withCredentials: true}).then((res) => {
                if (res.code === 100) {
                    this.$store.commit('user', res.data || {});
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/');
                }
            })
        },
    }
</script>