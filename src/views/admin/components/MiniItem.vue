<script setup>
import { useCollection } from '../../../stores/useCollection.js'
import { useGalleryListener } from '../../../stores/useGalleryListener.js'

const props = defineProps(['item']) 

const { delDoc } = useCollection()
const { startListening } = useGalleryListener()

const getBackgroundStyle = (url) => ({
  background: `linear-gradient(rgba(75, 74, 74, 0.9), rgba(75, 75, 75, 0.3), rgba(75, 75, 75, 0.5)), url('${url}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
})

const handleDelete = async () => {
    await delDoc('mosaics', props.item.id)
    startListening()
}
</script>

<template>    
    <div class="mini-item" :style="getBackgroundStyle(item.imageUrl)">
        <h2 class="title">{{ item.title }}</h2>

        <div class="actions-wrapper">
            <div class="icon-holder modify">
                <router-link :to="{path: `/admin/edit/${item.id}`}" class="link">
                    <i class="icon material-icons" aria-label="Edit mosaic">edit</i>
                </router-link>
            </div>
    
            <div class="icon-holder remove">
                <button @click="handleDelete" class="link">
                    <i class="icon material-icons" aria-label="Delete mosaic">delete</i>
                </button>
            </div>
        </div>
    </div>
</template>