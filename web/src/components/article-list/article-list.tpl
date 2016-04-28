<div class="article-list-container">
    <section class="article-list-item" v-for="article in list" v-bind:class="{ 'unpublished': !article.isPublished}">
        <a v-link="{ name: 'articleDetail', params: { id: article.enName }}">
            <h1 class="title">{{article.title}}</h1>
            <div>
                {{article.introduction}}
            </div>
        </a>
        <footer v-if="article.tags.length > 0">
            <section class="tags-container">
                <i class="icon-tag" title="Tags"></i>
                <a class="tag-item" v-for="tag in article.tags">{{tag}}</a>
            </section>
        </footer>
    </section>
</div>