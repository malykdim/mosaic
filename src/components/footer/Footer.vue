<script setup>
import Auth from './Auth.vue'
import Copy from './Copy.vue'
</script>

<template>
    <div class="footer-content">
        <Auth />
        <Copy />
        <div class="terms">terms</div>
    </div>
</template>

<style lang='scss' scoped>
.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: var(--background);
    color: var(--text-color);
    z-index: 1000;

    .terms {
        font-size: 0.8em;
        color: var(--secondary-text-color);
        text-decoration: none;
        margin-right: .5rem;
    }
}
@media screen and (max-width: 767px) and (min-width: 260px) {
    .footer-content {
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        gap: 0.5rem;

        .terms {
            margin: 0;
        }
    }
}
</style>