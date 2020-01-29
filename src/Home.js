import React from 'react';
import css from 'https://unpkg.com/csz';

export default () => (
  <div className={css`/src/index.css`}>
    <article>
      <div className="nav-bar">
        <div>
          {['Biz home', 'overview', 'uses', 'resources'].map(name => (
            <div>{name}</div>
          ))}
        </div>
      </div>
      <div className="second">
        <div>get your team in sync</div>
      </div>
      <div className="third">third</div>
    </article>
  </div>
);
