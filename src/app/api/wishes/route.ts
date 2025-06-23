import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const filePath = path.join(process.cwd(), 'data', 'wishes.json');

// Ensure data directory exists
function ensureDataDir() {
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

export async function GET() {
    try {
        ensureDataDir();
        
        if (!fs.existsSync(filePath)) {
            // Create empty file if it doesn't exist
            fs.writeFileSync(filePath, '[]');
            return NextResponse.json([]);
        }

        const data = fs.readFileSync(filePath, 'utf8');
        
        // Handle empty or invalid JSON
        if (!data.trim()) {
            fs.writeFileSync(filePath, '[]');
            return NextResponse.json([]);
        }

        const parsed = JSON.parse(data);
        return NextResponse.json(Array.isArray(parsed) ? parsed : []);
        
    } catch (error) {
        console.error('Error in GET /api/wishes:', error);
        
        // Try to recover by creating a new empty file
        try {
            ensureDataDir();
            fs.writeFileSync(filePath, '[]');
            return NextResponse.json([]);
        } catch (recoveryError) {
            console.error('Recovery failed:', recoveryError);
            return NextResponse.json({ error: 'Failed to read wishes' }, { status: 500 });
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        ensureDataDir();
        
        const body = await request.json();
        
        // Validate required fields
        if (!body.nama || !body.presensi || !body.ucapan) {
            return NextResponse.json(
                { error: 'Missing required fields' }, 
                { status: 400 }
            );
        }

        // Sanitize input
        const newWish = {
            nama: String(body.nama).trim(),
            presensi: String(body.presensi).trim(),
            ucapan: String(body.ucapan).trim(),
            timestamp: new Date().toISOString()
        };

        let existing = [];
        
        // Read existing data
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, 'utf8');
                if (data.trim()) {
                    const parsed = JSON.parse(data);
                    existing = Array.isArray(parsed) ? parsed : [];
                }
            } catch (parseError) {
                console.error('Error parsing existing data:', parseError);
                // Continue with empty array if parsing fails
                existing = [];
            }
        }

        // Add new wish to the beginning
        existing.unshift(newWish);
        
        // Keep only the latest 100 wishes to prevent file from growing too large
        if (existing.length > 100) {
            existing = existing.slice(0, 100);
        }

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
        
        return NextResponse.json({ 
            message: 'Ucapan berhasil disimpan',
            success: true 
        });
        
    } catch (error) {
        console.error('Error in POST /api/wishes:', error);
        return NextResponse.json(
            { error: 'Gagal menyimpan ucapan' }, 
            { status: 500 }
        );
    }
}