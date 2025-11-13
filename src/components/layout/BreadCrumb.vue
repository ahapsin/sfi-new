<template>
  <nav aria-label="Breadcrumb" class="flex items-center text-sm">
    <ol class="flex flex-wrap items-center gap-1 shadow border p-2 rounded-lg">
      <!-- Home -->
      <li>
        <router-link
          to="/"
          class="flex items-center gap-1 text-gray-500 hover:text-pr transition"
        >
          <v-icon name="bi-grid" size="18" />
          <span class="hidden sm:inline">Home</span>
        </router-link>
      </li>

      <!-- Dynamic crumbs -->
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <!-- Separator -->
        <li class="text-gray-400">
          <v-icon name="bi-chevron-right" size="18" />
        </li>

        <!-- Crumb -->
        <li>
          <router-link
            v-if="index !== breadcrumbs.length - 1"
            :to="crumb.path"
            class="text-gray-500 hover:text-pr transition capitalize"
          >
            {{ crumb.label }}
          </router-link>
          <span
            v-else
            class="text-pr font-semibold capitalize cursor-default"
          >
            {{ crumb.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Fungsi ubah slug ke teks (contoh: ims-master => Ims Master)
const formatLabel = (text) => {
  if (!text) return ''
  return text
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

// Buat breadcrumb otomatis
const breadcrumbs = computed(() => {
  // Pisahkan path seperti /ims/master menjadi ['ims', 'master']
  const segments = route.path.split('/').filter(Boolean)

  let pathAccumulator = ''
  return segments.map((segment) => {
    pathAccumulator += '/' + segment
    // Coba cari route yang cocok
    const match = route.matched.find((r) => r.path === pathAccumulator)

    return {
      path: pathAccumulator,
      label: match?.meta?.breadcrumb || formatLabel(segment)
    }
  })
})
</script>
