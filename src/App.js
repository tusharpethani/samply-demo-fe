// Main App.js file which load first, it'll manage entire Application routing with lazy loading

import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./page/Home/index.js'));
const TodoPage = lazy(() => import('./page/Todo/index.js'));

function Page() {
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    return (
        <>
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/todo" element={<TodoPage />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default Page;
