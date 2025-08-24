<script setup>

defineProps({
    item: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="card"> 

        <router-link :to="{path: `/gallery/${item.id}`}" class="link">
        
            <figure class="figure"> 

                <div class="image-container"> 
                    <img :src="item.imageUrl" :alt="item.title" />
                </div>
                
                <figcaption class="figure-caption"> 
                    <h4 class="title">{{ item.title }}</h4>                      
                </figcaption>

            </figure>

        </router-link>

    </div>
</template>