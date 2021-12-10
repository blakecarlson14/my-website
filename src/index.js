import React from 'react';
import ReactDOM from 'react-dom';

function TestHtml() {
    return (
        <div>
            <h1>My react is working!</h1>
        </div>
    )
}

ReactDOM.render(
<TestHtml />,
  document.getElementById('root')
);
