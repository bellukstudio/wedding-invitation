'use client';

import { useSearchParams } from 'next/navigation';
import Landing from './Landing';

interface Props {
    onFinish: () => void;
}

export default function LandingWrapper({ onFinish }: Props) {
    const params = useSearchParams();
    const to = params.get('to') || 'Teman teman semua';

    return <Landing onFinish={onFinish} to={to} />;
}
