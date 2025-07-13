<script setup>

</script>

<template>

    <article class="authors">
        <div class="links">
            <a href="https://www.facebook.com/vladimir.damynov/" target="_blank" class="link">
                Vladimir Damynov
            </a>
            <a href="https://www.facebook.com/damyan.damyanov.509/" target="_blank" class="link">
                Damyan Damyanov
            </a>
        </div>
        <div class="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente natus doloremque repudiandae. Voluptates non corrupti facere dolorum eveniet magni vero molestias, sit, optio sapiente veniam eos molestiae culpa aliquid necessitatibus ullam. Cumque numquam ut molestias iure doloribus! Voluptates, distinctio tempore a, nobis ipsum enim et modi labore, fuga repellat recusandae!</div>
    </article>

</template>

<style lang='scss' scoped>
.authors {
    width: 80%;
    margin: 0 auto;    
    padding: 1rem 0;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background-color: #fff;
    text-align: center;
    
    .links {
        display: flex;
        text-align: center;
        font-size: 1.5rem;
        gap: 2rem;
        font-weight: bold;

        .link {
            display: inline-block;
        }
    }
    .text {
        grid-column: 1 / 3;
        text-align: center;
        font-size: 1rem;
        color: #333;
        padding: 3.5rem 5rem;
        line-height: 1.5;
    }
}

</style>