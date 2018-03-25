(function(window, document, undefined) {
    /* 加载导航 */
    let nav_data = {
        '电影': 'https://m.douban.com/movie/',
        '图书': '/',
        '广播': 'https://m.douban.com/status/',
        '小组': 'https://m.douban.com/group/'
    };
    Object.keys(nav_data)
        .forEach((title, index) => {
            ((parent, colors) => {
                let li = document.createElement('LI');
                li.innerHTML = `<a href="${nav_data[title]}" style="color: #${colors[index]}">${title}</a>`
                parent.appendChild(li);
            })(document.querySelector('ul.nav-list'), ['2384E8', '9F7860', 'E4A813', '2ABBCC'])
        });
})(window, document, undefined)