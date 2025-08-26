<template>
  <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <n-form-item path="old" label="Nama">
      <n-input readonly :value="meData.me.nama" />
    </n-form-item>
    <n-form-item path="old" label="Email">
      <n-input readonly :value="meData.me.email" />
    </n-form-item>
    <n-form-item path="old" label="Cabang">
      <n-input readonly :value="meData.me.cabang_nama" />
    </n-form-item>
    <n-form-item path="old" label="Jabatan">
      <n-input readonly :value="meData.me.jabatan" />
    </n-form-item>
    <n-form-item path="old" label="No KTP">
      <n-input readonly :value="meData.me.no_ktp" />
    </n-form-item>
    <n-form-item path="old" label="Alamat">
      <n-input readonly :value="meData.me.alamat" />
    </n-form-item>
    <n-form-item path="old" label="Jenis Kelamin">
      <n-input readonly :value="meData.me.gender" />
    </n-form-item>
    <n-form-item path="old" label="Hp">
      <n-input readonly :value="meData.me.no_hp" />
    </n-form-item>
    <n-form-item path="old" label="Status">
      <n-input readonly :value="meData.me.status" />
    </n-form-item>
  </div>
</template>
<script setup>
import { useMeStore } from "../../../stores/me";

const meData = useMeStore();
</script>