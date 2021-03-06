import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`,
            });
            setLink(fetched);
        } catch (e) {

        }
    }, [token, request, linkId, setLink]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (!link) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!loading && <LinkCard link={link}/>}
        </>
    );
};
