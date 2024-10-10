# sp-school

Layout on Gulp with nunjucks

Gulp (npm v.14.9.1 or you need nvm to change version npm):
- nvm i 14.9.1 && nvm use 14.9.1
- npm install
- gulp

Stack:
- HTML: 
  - OPOR methodology (https://sapegin.me/blog/opor-methodology/)<br>
  - Nunjucks (https://mozilla.github.io/nunjucks/)
- SCSS: components structure:<br>
  - base/ - includes global styles such as reset styles, typography, colors, etc.<br>
  - components/ - contains individual components with a separate .scss file for each of them.<br>
  - layout/ - contains styles for the main layout components, such as header, footer, navigation, sections.<br>
  - admin/ - it's only admin style, for school dashboard in WP dashboard;
- images: 
  - Pictures are uploaded to the WP library server to speed up programming;
  - imgUrl is var with path to server url. It's var location: app/layout/layout.njk;
- JS: Native