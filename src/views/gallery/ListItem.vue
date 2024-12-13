<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    item: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div classname="Card"> 
            <figure classname="Figure"> 
                <div classname="image-container"> 
                        <RouterLink to="#" > 
                            <img src="item.img" alt="item.title" />
                        </RouterLink>
                </div>
                <figcaption> 
                "{item.name}" by {item.author}"                       
                </figcaption>
            </figure>
    </div>
</template>

<style lang='scss' scoped>

</style>