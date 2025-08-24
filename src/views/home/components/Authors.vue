<script setup>
import { useI18n } from '../../../stores/useI18n'
const { translate } = useI18n()
console.log('i18n test:', translate('home.authors.vladimir.name'))
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
                <h3 class="name">{{ translate('home.authors.vladimir.name') }}</h3>
                <div class="author">
                    <p class="p">
                    {{ translate('home.authors.vladimir.p1') }}
                    </p>
                    <p class="p">
                    {{ translate('home.authors.vladimir.p2') }}
                    </p>
                    <p class="p">
                    {{ translate('home.authors.vladimir.p3') }}
                    </p>   
                </div>
                
                <h3 class="name">{{ translate('home.authors.damyan.name') }}</h3>
                <div class="author">
                    <p class="p">
                    {{ translate('home.authors.damyan.p1') }}
                    </p>
                    <p class="p">
                    {{ translate('home.authors.damyan.p2') }}
                    </p>
                    <p class="p">
                    {{ translate('home.authors.damyan.p3') }}
                    </p>
                </div>
            </div>

            <div class="links">
                <a href="https://www.facebook.com/vladimir.damyanov/" 
                    class="link" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook profile of Vladimir Damyanov"
                    :aria-label="translate('home.authors.links.vladimir_facebook_label')"
                >
                    <i class="icon material-icons" :aria-label="translate('home.authors.links.vladimir_facebook_label')">facebook</i>
                    {{ translate('home.authors.links.vladimir_text') }}
                </a>
    
                <p class="delimiter">&</p>

                <a href="https://www.facebook.com/damyan.damyanov.509/" 
                    class="link" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook profile of Damyan Damynov"
                    :aria-label="translate('home.authors.links.damyan_facebook_label')"
                >
                    <i class="icon material-icons" :aria-label="translate('home.authors.links.damyan_facebook_label')">facebook</i>
                    {{ translate('home.authors.links.damyan_text') }}
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
                    font-family: 'Caudex';
                    font-size: 1em;
                    padding-bottom: .8rem;
                    color: var(--input);
                    line-height: 1.6em;
                    letter-spacing: 0.05em;
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
                font-size: x-large;
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