<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="container mx-auto h-full">
    <h1 class="text-3xl">Login / Signup</h1>

    <div class="form-control">
      <div class="input-group w-full m-4">
        <span>Username</span>
        <input class="input input-bordered w-full" type="text" v-model="username" />
      </div>
      <div class="input-group w-full m-4">
        <span>Password</span>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          class="input input-bordered w-full"
        />
        <button class="btn btn-square" @click="togglePassword">
          <img :src="passwordImgSrc" alt="Show Password" />
        </button>
      </div>
      <div class="container m-4 grid grid-cols-2">
        <button
          class="btn btn-active btn-primary justify-self-start w-1/2 mr-2 my-2"
          @click="login"
        >
          Login
        </button>
        <button
          class="btn btn-active btn-secondary justify-self-end w-1/2 ml-2 my-2"
          @click="signup"
        >
          Sign Up
        </button>
      </div>
    </div>

    <div class="alert shadow-lg" v-if="failed">
      <div>
        <img src="@/assets/icons/alert-circle.svg" alt="Alert" />
        <span>Login / Signup failed</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, defineEmits } from 'vue';
import OPEN_EYE from '@/assets/icons/eye.svg';
import CLOSED_EYE from '@/assets/icons/eye-off.svg';

const URL = 'http://localhost:6969';

const username = ref('');
const password = ref('');

const failed = ref(false);

const showPassword = ref(false);

const passwordImgSrc = ref(OPEN_EYE);

const emit = defineEmits(['login']);

const fail = () => {
  failed.value = true;
  setTimeout(() => {
    failed.value = false;
  }, 5000);
};

const login = async () => {
  const { data: json } = await axios.post(`${URL}/login`, {
    username: username.value,
    password: password.value,
  });
  if (json.successful) {
    localStorage.setItem('user', username.value);
    emit('login');
  } else {
    fail();
  }
};

const signup = async () => {
  const { data: json } = await axios.post(`${URL}/signup`, {
    username: username.value,
    password: password.value,
  });
  if (json.successful) {
    localStorage.setItem('user', username.value);
    emit('login');
  } else {
    fail();
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
  passwordImgSrc.value = showPassword.value ? CLOSED_EYE : OPEN_EYE;
};
</script>

<style></style>
