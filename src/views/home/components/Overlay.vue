<script setup></script>

<template>
    <div class="overlay">
        <h2 class="title">THE STONE MAGIC</h2>        
        <p class="subtitle">
            virtual gallery for exquisite mosaic panneaux
        </p>        
        <router-link :to="{name: 'gallery'}" class="link">View the Gallery</router-link>       
    </div>
</template>

<style lang='scss' scoped>
.overlay {
    position: absolute;
    inset: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    
    z-index: 100;


    .title {
        color: rgba(210,175,93, 0.8);
        text-transform: uppercase;
        letter-spacing: 0.5em;
        font-weight: 300;
        text-shadow: 15px 8px 20px rgba(255, 255, 255, 0.4);

        margin-bottom: 1rem;
        margin-top: 15rem;

        font-size: clamp(1.5rem, 4vw, 3rem);

        @media screen and (max-width: 1024px) {
            font-size: 2em; /* Adjust font size for tablets */
        }

        @media screen and (max-width: 500px) {
            // font-size: 1.8em; /* Smaller font size for mobile */
            letter-spacing: 0.2em; // Reduce letter spacing on small screens
        }
    }

    .subtitle {
        color: var(--secondary);
        letter-spacing: .4em;
        margin-bottom: 2rem;
        font-size: clamp(0.8rem, 2vw, 1.2rem);

        @media screen and (max-width: 500px) {
            letter-spacing: 0.2em;
        }
    }

    .link {
        padding: 1rem 2rem;
        background-color: rgba(210,175,93, 0.8);
        color: #fff;
        text-decoration: none;
        border-radius: 2px;

        transition: background-color 0.3s ease;
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        
        margin-bottom: 15rem;
        text-align: center;
        background-color: var(--primary);
        margin-top: auto; /* Push to the bottom */
        display: block;

        &:hover {
            background-color: rgba(210,175,93, 1);
        }
    }

    @media screen and (max-width: 767px) {

        .title {
            margin-top: 10rem;
            font-size: clamp(1.2rem, 6vw, 2rem);
        }
        .subtitle {
            font-size: clamp(1rem, 6vw, 2rem);
        }
    }
}
</style>