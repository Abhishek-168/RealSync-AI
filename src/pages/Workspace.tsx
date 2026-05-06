import { useEffect, useState } from 'react'
    
import { RecoilRoot } from 'recoil'
import { useParams } from 'react-router-dom'
import { io, type Socket } from 'socket.io-client'
import Bar2 from '../components/appbar1';
import Folder from '../components/folder';
import Menu from '../components/menu';
import Mid from '../components/codespace';
import Right from '../components/right';

function Workspace(){
    const { roomId } = useParams();
    type FileRecord = { path: string; content: string };
    type FileTuple = [string, string];

    const [openFiles, setOpenFiles] = useState<FileRecord[]>([]);
    const [activeFile, setActiveFile] = useState<string | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        if (roomId) {
            newSocket.emit('join-room', roomId);
        }

        // Handle chat messages
        newSocket.on('chat-message', (data) => {
            console.log('Received chat message:', data);
            if (data.roomId === roomId) {
                // The server will handle broadcasting to other users
                console.log('Message received in room:', data);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    // Poll for file updates
    useEffect(() => {
        if (!roomId) return;

        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:5000/file-updates?roomId=${roomId}`);
                if (!response.ok) throw new Error('Failed to fetch updates');
                
                const data = (await response.json()) as { files: FileTuple[] };
                const newFiles = data.files.map(([path, content]) => ({
                    path,
                    content
                }));

                // Only update if files have changed
                if (JSON.stringify(newFiles) !== JSON.stringify(openFiles)) {
                    console.log('Polling found updates:', newFiles);
                    setOpenFiles(newFiles);
                    setLastUpdate(Date.now());
                }
            } catch (error) {
                console.error('Error polling for updates:', error);
            }
        }, 1000); // Poll every second

        return () => clearInterval(pollInterval);
    }, [roomId, openFiles]);

    useEffect(() => {
        if (socket && roomId) {
            // Handle initial files update
            socket.on('files-update', (files: FileTuple[]) => {
                console.log('Received files update:', files);
                const newOpenFiles = files.map(([path, content]) => ({
                    path,
                    content
                }));
                setOpenFiles(newOpenFiles);
                if (newOpenFiles.length > 0 && !activeFile) {
                    setActiveFile(newOpenFiles[0].path);
                }
            });

            // Handle file updates from other users
            socket.on('file-update', ({ filePath, content }: { filePath: string; content: string }) => {
                console.log('Received file update:', filePath, content);
                setOpenFiles(prevFiles => {
                    const existingFileIndex = prevFiles.findIndex(file => file.path === filePath);
                    if (existingFileIndex !== -1) {
                        const newFiles = [...prevFiles];
                        newFiles[existingFileIndex] = { ...newFiles[existingFileIndex], content };
                        return newFiles;
                    }
                    return [...prevFiles, { path: filePath, content }];
                });
            });

            return () => {
                socket.off('files-update');
                socket.off('file-update');
            };
        }
    }, [socket, roomId]);

    const handleFileClick = (content: string, filePath: string) => {
        console.log('File clicked:', filePath, content);
        // Check if file is already open
        const existingFileIndex = openFiles.findIndex(file => file.path === filePath);
        
        if (existingFileIndex === -1) {
            // Add new file to open files
            const newFiles = [...openFiles, { content, path: filePath }];
            setOpenFiles(newFiles);
            
            // Emit file change to other users
            if (socket && roomId) {
                console.log('Emitting file change:', { roomId, filePath, content });
                socket.emit('file-change', { roomId, filePath, content });
            }
        }
        
        // Set as active file
        setActiveFile(filePath);
    };

    const handleCloseFile = (filePath: string) => {
        setOpenFiles(prev => prev.filter(file => file.path !== filePath));
        
        // If we're closing the active file, set a new active file
        if (activeFile === filePath) {
            const remainingFiles = openFiles.filter(file => file.path !== filePath);
            setActiveFile(remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1].path : null);
        }
    };

    const handleTabClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    return(
        <>
        <Bar2></Bar2>
    
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <div style={{
                display:'flex',
                flexDirection:'row',
            }}>
                <Menu roomId={roomId} />
                <Folder onFileClick={handleFileClick} />
                <Mid
                    openFiles={openFiles}
                    activeFile={activeFile}
                    onCloseFile={handleCloseFile}
                    onTabClick={handleTabClick}
                    roomId={roomId}
                    socket={socket}
                />                      
            </div>
            
            <Right socket={socket} roomId={roomId} />
        </div>
        </>
    )
}

export default Workspace