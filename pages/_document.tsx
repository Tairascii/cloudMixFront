import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='ru' prefix='og: http://ogp.me/ns#'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
           
              ym(92747255, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true
              });
              `,
          }}
        />
        <noscript>
          <div>
            <img
              alt=''
              src='https://mc.yandex.ru/watch/92747255'
              style={{ position: 'absolute', left: '-9999px' }}
            />
          </div>
        </noscript>
        <script
          src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-64030d482952cfc0'
          type='text/javascript'
        />
      </body>
    </Html>
  )
}
