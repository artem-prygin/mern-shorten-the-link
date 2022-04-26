import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
    const { token } = useContext(AuthContext);
    const [link, setLink] = useState('');
    const { request } = useHttp();
    const navigate = useNavigate();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${token}`,
                });
                const detailedLink = `/detail/${data.link._id}`;
                navigate(detailedLink);
            } catch (error) {

            }
        }
    };

    return (
        <div className="row">
            <div className="s-8 offset-s2">
                <div className="input-field">
                    <input placeholder="Link"
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                           id="link"
                           type="text"/>
                    <label htmlFor="link">Link</label>
                </div>
            </div>
        </div>
    );
};
