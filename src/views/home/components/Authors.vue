<script setup>
import { useI18n } from '../../../stores/useI18n'
const { translate } = useI18n()
</script>

<template>

    <article class="authors">
        <div class="row">
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
        </div>

        <div class="row">
            <div class="about">
                <div class="text">
                    <h2 class="name">{{ translate('home.authors.vladimir.name') }}</h2>
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
                    
                    <h2 class="name">{{ translate('home.authors.damyan.name') }}</h2>
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
            </div>
        </div>
        
        <div class="row">
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