<!-- 文章详情页中间主体部分 -->
<div class="article-detail-page-container">
    <!--- 文章目录模板 -->
    <aside>
        <div v-if="headerTree.length > 0" v-el:header class="article-detail-headers-container"
             :class="{ 'open': isOpenHeaders}" :style="[closeHeadersStyle]">
            <header>
                文章目录
                <button class="icon-catalogue" v-on:click="openHeaders">
                    <i></i>
                </button>
                <button class="icon-close" v-on:click="closeHeaders"></button>
            </header>
            <ul  v-el:header-ul>
                <li v-for="item in headerTree">
                    <a v-on:click="scrollToHeaderContent" data-value="{{item.id}}">{{item.text}}</a>
                    <ul v-if="item.children.length > 0">
                        <li v-for="item in item.children">
                            <a v-on:click="scrollToHeaderContent" data-value="{{item.id}}">{{item.text}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>
    <!-- 文章详情页模板 -->
    <article class="article-detail-container">{{{htmlContent}}}</article>
</div>
