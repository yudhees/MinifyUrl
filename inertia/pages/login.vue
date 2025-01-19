<template>
  <div class="container mt-5">
        <div class="card mx-auto" style="max-width: 400px;">
            <div class="card-body text-center">
                <h5 class="card-title">Welcome</h5>
                <p class="card-text">Sign in with your Google account to continue.</p>
                <GoogleBtn @click="openSignIn"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import GoogleBtn from '~/components/GoogleBtn.vue'
const openSignIn=()=>{
   window.location.href='/login'
}
</script>
