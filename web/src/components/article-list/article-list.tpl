<div class="article-list-container">
    <article class="article-list-item" v-for="article in list">
        <a href="#!/articles/{{article.enName}}">
            <h1 class="title">{{article.title}}</h1>
            <summary>
                {{article.introduction}}
            </summary>
        </a>
        <footer>
            <section class="tags-container">
                <i class="icon-tag" title="Tags"></i>
                <a class="tag-item" v-for="tag in article.tags">{{tag}}</a>
            </section>
        </footer>
    </article>
</div>