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

<style lang='scss' scoped>
.card {
    width: 300px;
    height: 300px;
    margin: 1rem;
    border-radius: 4px;
    // overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;

    .figure {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;

        .image-container {
            width: 100%;
            height: 300px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;


            img {
                width: 100%;
                height: auto;
                border-radius: 4px;
                object-fit: cover;
                object-position: 50% 50%;
                vertical-align: -moz-middle-with-baseline;
                vertical-align: middle;
            }
        }

        .figure-caption {
            position: absolute;
            bottom: 0;
            left: 0;    
            right: 0;
            background: linear-gradient(to top, var(--background), transparent);
            border-radius: 4px;

            z-index: 14;

            .title {
                font-size: 1.2rem;
                color: white;
                margin: 1rem;
                opacity: 1;
            }
        }
    }

    
    &:hover {
        transform: scale(1.05);
    }

}
@media screen and (max-width: 767px) and (min-width: 260px) {
    .card {
        width: 100%;
        margin: 0 0 15px 0;
    }
}
</style>