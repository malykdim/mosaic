<script setup>

</script>

<template>

    <article class="authors">
        <picture class="picture">
            <source srcset="../../../assets/images/authors.webp" type="image/webp" />
            <source srcset="../../../assets/images/authors.jpg" type="image/jpeg" />
            <img
                src="../../../assets/images/authors.jpg"
                alt="Picture of Vladimir Damynov and Damyan Damyanov"
                class="image"
                loading="lazy"
            />
        </picture>

        <div class="about">
            <div class="text">
                <h2 class="name">Vladimir Damyanov</h2>
                <div class="author">
                    <p class="p">
                    Wins the Annual Award of the Society of Plovdiv Artists in the sculpture category for 2024.
                    </p>
                    <p class="p">
                    His mosaic panels participate in many exhibitions in Bulgaria, 
                    Sweden, Norway, Austria, Germany, Italy, France, Great Britain, and the USA.
                    </p>
                    <p class="p">
                    The artist also experiments in the field of abstract compositions of glass ceramics.
                    </p>   
                </div>
                
                <h2 class="name">Damyan Damyanov</h2>
                <div class="author">
                    <p class="p">
                    Master of mosaic with his own style.
                    </p>
                    <p class="p">
                    His works have been presented in numerous exhibitions.
                    </p>
                    <p class="p">
                    His compositions are made entirely with natural stones: black marl, syenite, marble, granite, tiger's eye, 
                    limestone species, rock crystals, and semi-precious stones like jasper, agate and others. 
                    </p>
                </div>
            </div>

            <div class="links">
                <a href="https://www.facebook.com/vladimir.damynov/" 
                    class="link" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook profile of Vladimir Damynov"
                >
                    <i class="icon material-icons" aria-label="Vladimir Damynov on facebook">facebook</i>
                    Vladimir Damynov
                </a>
    
                <p class="delimiter">&</p>

                <a href="https://www.facebook.com/damyan.damyanov.509/" 
                    class="link" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook profile of Damyan Damynov"
                >
                    <i class="icon material-icons" aria-label="Damyan Damyanov on facebook">facebook</i>
                    Damyan Damyanov
                </a>
            </div>
        </div>
    </article>

</template>

<style lang='scss' scoped>
.authors {
    width: 100%;
    margin: 0 auto;    
    padding: 0;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    
    background-color: #fff;
    text-align: center;
    
    .picture {
        .image {
            width: 50vw;
        }
    }
    .about {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        gap: 0;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 2rem;
        
        .text {
            grid-column: 1 / 3;
            text-align: center;
            font-size: 0.8em;
            color: #333;
            padding: 3.5rem 5rem;
            line-height: 1.5;

            .name {
                color: var(--primary);
                padding-bottom: .8rem;

            }

            .author {
                margin-bottom: 1.8rem;
                .p {
                    font-family: 'Verdana';
                    font-size: 1em;
                    padding-bottom: .8rem;
                    color: var(--input);
                    line-height: 1.8em;
                    letter-spacing: 0.1em;
                }
            }
        }

        .links {

            .link {
                display: inline-block;
                font-size: 0.8em;
                color: var(--primary);
    
                display: flex;
                justify-content: center;
                align-items: center;
    
                .icon {
                    font-size: 1.2em;
                    padding-right: 0.8em;
                }
            }
    
            .delimiter {
                font-size: xx-large;
                color: var(--primary);
            }
        }
    }
}

@media screen and (max-width: 900px) {
    .authors {
        flex-direction: column;   
    }     
}
</style>