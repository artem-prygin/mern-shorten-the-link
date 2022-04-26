export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link</h2>
            <p>Shorten link: <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p>
            <p>Original link: <a href={link.from} target="_blank" rel="noreferrer">{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Date: <strong>{(new Date(link.date).toLocaleDateString())}</strong></p>
        </>
    );
};
