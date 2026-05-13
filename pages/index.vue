<template>
  <div>
    <h1>ページ一覧</h1>
    <ul>
      <li><NuxtLink to="/current_date">現在の時刻</NuxtLink></li>
      <li><NuxtLink to="/subscribe">マガジン登録</NuxtLink></li>
      <li><NuxtLink to="/login/2step_login">2ステップログイン</NuxtLink></li>
      <li><NuxtLink to="/login/2step_pre_regist">2ステップ事前登録</NuxtLink></li>
      <li><NuxtLink to="/login/2step_regist">2ステップ登録</NuxtLink></li>
      <li><NuxtLink to="/cors-pdf-test">PDF CORSエラー再現ページ</NuxtLink></li>
    </ul>
  </div>
</template>

<script setup>
</script>
