<template>
    <div class="livechat-container">
      <a href="https://www.livechat.com/chat-with/13260753/" rel="nofollow"></a>
      <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank"></a>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      window.__lc = window.__lc || {};
      window.__lc.license = 13260753;
      function i(n) {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }
      const e = {
        _q: [],
        _h: null,
        _v: "2.0",
        on() {
          i(["on", Array.prototype.slice.call(arguments)]);
        },
        once() {
          i(["once", Array.prototype.slice.call(arguments)]);
        },
        off() {
          i(["off", Array.prototype.slice.call(arguments)]);
        },
        get() {
          if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
          return i(["get", Array.prototype.slice.call(arguments)]);
        },
        call() {
          i(["call", Array.prototype.slice.call(arguments)]);
        },
        init() {
          const n = document.createElement("script");
          n.async = true;
          n.type = "text/javascript";
          n.src = "https://cdn.livechatinc.com/tracking.js";
          document.head.appendChild(n);
        }
      };
      if (!window.__lc.asyncInit) {
        e.init();
      }
      window.LiveChatWidget = e;
  
      const liveChatLink = document.querySelector('.livechat-container a');
      liveChatLink.addEventListener('click', (event) => {
        event.preventDefault();
      });
    }
  };
  </script>