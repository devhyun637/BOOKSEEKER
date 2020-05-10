import React from 'react'
import { Button } from 'react-bootstrap';


function RecommendPage() {
    return (
        <div>
            <form>
                <Button style={{
                    display: 'block',
                    border: "0.001px solid #222222",
                    background: "f7f7f7",
                    color: "#222222",
                    width: '90%',
                    fontSize: '14px',
                    margin: '20px auto',
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}
                    href="/search"
                    variant="outline-secondary">
                    검색
                    </Button>
            </form>
        </div>
    )
}

export default RecommendPage
