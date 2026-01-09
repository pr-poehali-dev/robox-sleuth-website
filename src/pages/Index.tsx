import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockPlayers = [
  { id: 1, username: 'xXDarkPhoenixXx420', status: 'online', lastSeen: 'Now', game: 'Adopt Me!', playtime: '247h', level: 89 },
  { id: 2, username: 'NightmareReaper2k8', status: 'offline', lastSeen: '15 min ago', game: 'Brookhaven', playtime: '183h', level: 45 },
  { id: 3, username: 'ShadowAssassinYT', status: 'online', lastSeen: 'Now', game: 'Blox Fruits', playtime: '512h', level: 142 },
  { id: 4, username: 'iiCyberWolfTTV', status: 'ingame', lastSeen: 'In-game', game: 'Tower of Hell', playtime: '98h', level: 67 },
  { id: 5, username: 'ToxicVenomPro999', status: 'online', lastSeen: 'Now', game: 'Build A Boat', playtime: '356h', level: 103 },
];

const mockMessages = [
  { id: 1, from: 'xXDarkPhoenixXx420', to: 'NightmareReaper2k8', text: 'Saw something strange...', time: '14:32', read: true, type: 'player' },
  { id: 2, from: 'ShadowAssassinYT', to: 'xXDarkPhoenixXx420', text: 'Someone is watching me', time: '14:28', read: true, type: 'player' },
  { id: 3, from: 'NightmareReaper2k8', to: 'ShadowAssassinYT', text: 'What is happening?', time: '14:15', read: false, type: 'player' },
  { id: 4, from: 'iiCyberWolfTTV', to: 'ToxicVenomPro999', text: 'Found a secret code', time: '13:45', read: true, type: 'player' },
];

const mockAdminChat = [
  { id: 1, from: 'SPECTATOR047', text: 'lmao this kid really thinks hes safe', time: '14:35', type: 'admin' },
  { id: 2, from: 'SPECTATOR112', text: 'watch him freak out when he sees the glitch', time: '14:33', type: 'admin' },
  { id: 3, from: 'SPECTATOR089', text: 'should we mess with his inventory again?', time: '14:30', type: 'admin' },
  { id: 4, from: 'SPECTATOR047', text: 'already did, check cam 3', time: '14:29', type: 'admin' },
  { id: 5, from: 'SPECTATOR112', text: 'HAHAHAHA dude is losing it', time: '14:25', type: 'admin' },
  { id: 6, from: 'SPECTATOR203', text: 'these noobs are so predictable', time: '14:20', type: 'admin' },
  { id: 7, from: 'SPECTATOR089', text: 'bet he alt+f4s in 5 minutes', time: '14:18', type: 'admin' },
];

const mockCameras = [
  { id: 1, name: 'CAM-01: Adopt Me Lobby', game: 'Adopt Me!', status: 'active', viewers: 12, location: 'Main Plaza', quality: 'HD' },
  { id: 2, name: 'CAM-02: Brookhaven Streets', game: 'Brookhaven', status: 'active', viewers: 8, location: 'Downtown', quality: '4K' },
  { id: 3, name: 'CAM-03: Blox Fruits Arena', game: 'Blox Fruits', status: 'active', viewers: 15, location: 'PvP Zone', quality: 'HD' },
  { id: 4, name: 'CAM-04: Tower of Hell', game: 'Tower of Hell', status: 'recording', viewers: 6, location: 'Floor 45', quality: 'HD' },
  { id: 5, name: 'CAM-05: Build A Boat Port', game: 'Build A Boat', status: 'active', viewers: 4, location: 'Harbor', quality: '4K' },
  { id: 6, name: 'CAM-06: Jailbreak Prison', game: 'Jailbreak', status: 'active', viewers: 9, location: 'Cell Block A', quality: 'HD' },
];

const mockStats = {
  totalTracked: 1247,
  activeNow: 834,
  messagesIntercepted: 15623,
  dataCollected: '2.4 TB',
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [messageView, setMessageView] = useState<'players' | 'admin'>('players');

  const filteredPlayers = mockPlayers.filter(p => 
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)`,
        }} />
      </div>

      <div className="relative z-10">
        <header className="border-b-2 border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-primary">
                  <Icon name="Eye" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">ROBLOX TRACKER</h1>
                  <p className="text-xs text-muted-foreground">SURVEILLANCE SYSTEM v2.4</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">ACTIVE</span>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                  <Icon name="AlertTriangle" size={12} className="mr-1" />
                  CLASSIFIED
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <nav className="border-b-2 border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex gap-1">
              {[
                { id: 'home', label: 'HOME', icon: 'Home' },
                { id: 'tracking', label: 'TRACKING', icon: 'Crosshair' },
                { id: 'cameras', label: 'CAMERAS', icon: 'Video' },
                { id: 'stats', label: 'STATISTICS', icon: 'BarChart3' },
                { id: 'messages', label: 'MESSAGES', icon: 'MessageSquare' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-4 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon as any} size={16} />
                  <span className="text-sm font-bold">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'TOTAL TARGETS', value: mockStats.totalTracked, icon: 'Users', color: 'text-blue-400' },
                  { label: 'ONLINE NOW', value: mockStats.activeNow, icon: 'Activity', color: 'text-green-400' },
                  { label: 'INTERCEPTED', value: mockStats.messagesIntercepted, icon: 'Mail', color: 'text-yellow-400' },
                  { label: 'DATA STORED', value: mockStats.dataCollected, icon: 'Database', color: 'text-purple-400' },
                ].map((stat, idx) => (
                  <Card key={idx} className="p-4 bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Icon name={stat.icon as any} className={stat.color} size={24} />
                      <div className="w-2 h-2 bg-primary animate-pulse" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-bold">{stat.label}</div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Radio" className="text-primary" size={20} />
                    ACTIVE TARGETS
                  </h2>
                  <Badge variant="outline" className="text-green-400 border-green-400 border-2">
                    {mockPlayers.filter(p => p.status === 'online' || p.status === 'ingame').length} ONLINE
                  </Badge>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {mockPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-border"
                        onClick={() => setSelectedPlayer(player.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="rounded-none">
                            <AvatarFallback className="bg-primary text-primary-foreground rounded-none">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold">{player.username}</div>
                            <div className="text-xs text-muted-foreground">{player.game}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground font-bold">{player.playtime}</div>
                            <div className="text-xs text-muted-foreground">Level {player.level}</div>
                          </div>
                          <div className={`w-3 h-3 ${
                            player.status === 'online' || player.status === 'ingame' ? 'bg-green-500' : 'bg-gray-500'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Search" className="text-primary" size={20} />
                  PLAYER SEARCH
                </h2>
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Enter username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-background border-2 border-border"
                  />
                  <Button className="bg-primary hover:bg-primary/90 border-2 border-primary">
                    <Icon name="ScanLine" size={16} className="mr-2" />
                    SCAN
                  </Button>
                </div>

                <div className="space-y-3">
                  {filteredPlayers.map((player) => (
                    <Card key={player.id} className="p-4 bg-muted/50 border-2 border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12 rounded-none">
                            <AvatarFallback className="bg-primary text-primary-foreground text-lg rounded-none">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-lg mb-1">{player.username}</div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant={player.status === 'online' || player.status === 'ingame' ? 'default' : 'secondary'} className="border-2">
                                {player.status === 'online' ? 'ONLINE' : player.status === 'ingame' ? 'IN-GAME' : 'OFFLINE'}
                              </Badge>
                              <Badge variant="outline" className="border-2">Level {player.level}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>Last game: {player.game}</div>
                              <div>Playtime: {player.playtime}</div>
                              <div>Last activity: {player.lastSeen}</div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-2 border-primary text-primary">
                          <Icon name="Eye" size={14} className="mr-1" />
                          DETAILS
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'cameras' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockCameras.map((camera) => (
                  <Card key={camera.id} className="p-0 bg-card/80 backdrop-blur-sm border-2 border-border overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="relative aspect-video bg-muted/30 flex items-center justify-center cursor-pointer" onClick={() => setSelectedCamera(camera.id)}>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className={`w-3 h-3 ${
                          camera.status === 'active' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                        }`} />
                        <span className="text-xs font-mono bg-black/50 px-2 py-1 border border-primary/50">
                          {camera.status === 'active' ? 'LIVE' : 'REC'}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-black/50 border-2 border-primary/50">
                          {camera.quality}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center relative z-10">
                          <Icon name="Video" className="text-primary/50 mx-auto mb-2" size={64} />
                          <div className="w-12 h-12 border-2 border-primary/50 absolute top-0 left-1/2 -translate-x-1/2 animate-ping" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 scan-line" />
                    </div>
                    <div className="p-4 border-t-2 border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold mb-1">{camera.name}</h3>
                          <p className="text-sm text-muted-foreground">{camera.game}</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-2 border-primary text-primary">
                          <Icon name="Maximize2" size={14} className="mr-1" />
                          VIEW
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={12} />
                          {camera.location}
                        </span>
                        <span className="flex items-center gap-1 font-bold">
                          <Icon name="Eye" size={12} />
                          {camera.viewers} watching
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Monitor" className="text-primary" size={20} />
                  CAMERA CONTROL PANEL
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 border-2 border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground font-bold">Active Cameras</span>
                      <Icon name="Video" className="text-green-400" size={16} />
                    </div>
                    <div className="text-2xl font-bold">{mockCameras.filter(c => c.status === 'active').length}/{mockCameras.length}</div>
                  </div>
                  <div className="p-4 bg-muted/30 border-2 border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground font-bold">Total Viewers</span>
                      <Icon name="Users" className="text-blue-400" size={16} />
                    </div>
                    <div className="text-2xl font-bold">{mockCameras.reduce((acc, c) => acc + c.viewers, 0)}</div>
                  </div>
                  <div className="p-4 bg-muted/30 border-2 border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground font-bold">Recording</span>
                      <div className="w-2 h-2 bg-red-500 animate-pulse" />
                    </div>
                    <div className="text-2xl font-bold">{mockCameras.filter(c => c.status === 'recording').length} feeds</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" size={20} />
                    ACTIVITY BY TIME
                  </h2>
                  <div className="space-y-3">
                    {['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-00:00'].map((time, idx) => {
                      const percentage = [25, 45, 85, 70][idx];
                      return (
                        <div key={time}>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="text-muted-foreground font-bold">{time}</span>
                            <span className="font-bold">{percentage}%</span>
                          </div>
                          <div className="w-full bg-muted h-4 border border-border">
                            <div
                              className="bg-primary h-4 transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Gamepad2" className="text-primary" size={20} />
                    POPULAR GAMES
                  </h2>
                  <div className="space-y-3">
                    {[
                      { name: 'Adopt Me!', players: 342 },
                      { name: 'Brookhaven', players: 278 },
                      { name: 'Blox Fruits', players: 195 },
                      { name: 'Tower of Hell', players: 156 },
                      { name: 'Build A Boat', players: 134 },
                    ].map((game) => (
                      <div key={game.name} className="flex items-center justify-between p-2 bg-muted/30 border border-border">
                        <span className="text-sm font-bold">{game.name}</span>
                        <Badge variant="secondary" className="border-2">{game.players} players</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="MapPin" className="text-primary" size={20} />
                  ACTIVITY MAP
                </h2>
                <div className="h-[300px] bg-muted/30 border-2 border-border flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-1 p-4">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-primary"
                          style={{
                            opacity: Math.random() * 0.8 + 0.2,
                            animation: `pulse ${2 + Math.random() * 2}s infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 text-center">
                    <Icon name="Globe" className="text-primary mx-auto mb-2" size={48} />
                    <p className="text-muted-foreground font-bold">GLOBAL COVERAGE</p>
                    <p className="text-2xl font-bold mt-2">{mockStats.activeNow} active nodes</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex gap-2 mb-4">
                <Button 
                  onClick={() => setMessageView('players')}
                  variant={messageView === 'players' ? 'default' : 'outline'}
                  className="border-2"
                >
                  PLAYER MESSAGES
                </Button>
                <Button 
                  onClick={() => setMessageView('admin')}
                  variant={messageView === 'admin' ? 'default' : 'outline'}
                  className="border-2"
                >
                  ADMIN CHAT
                </Button>
              </div>

              {messageView === 'players' && (
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Icon name="Wifi" className="text-primary" size={20} />
                      INTERCEPTED MESSAGES
                    </h2>
                    <Badge variant="destructive" className="animate-pulse border-2">
                      <Icon name="Radio" size={12} className="mr-1" />
                      WIRETAP ACTIVE
                    </Badge>
                  </div>

                  <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                      {mockMessages.map((msg) => (
                        <Card key={msg.id} className="p-4 bg-muted/50 border-2 border-border hover:border-primary/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8 rounded-none">
                                <AvatarFallback className="bg-primary/20 text-primary text-xs rounded-none">
                                  {msg.from.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-bold text-sm">{msg.from}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Icon name="ArrowRight" size={10} />
                                  {msg.to}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground font-bold">{msg.time}</span>
                              {msg.read ? (
                                <Icon name="CheckCheck" size={14} className="text-primary" />
                              ) : (
                                <Icon name="Check" size={14} className="text-muted-foreground" />
                              )}
                            </div>
                          </div>
                          <div className="text-sm pl-10">{msg.text}</div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              )}

              {messageView === 'admin' && (
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Icon name="Shield" className="text-primary" size={20} />
                      SPECTATOR CHAT
                    </h2>
                    <Badge variant="default" className="bg-primary border-2">
                      <Icon name="Users" size={12} className="mr-1" />
                      {mockAdminChat.length} SPECTATORS
                    </Badge>
                  </div>

                  <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                      {mockAdminChat.map((msg) => (
                        <Card key={msg.id} className="p-4 bg-primary/10 border-2 border-primary/30 hover:border-primary/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8 rounded-none">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs rounded-none font-bold">
                                  S{msg.from.replace('SPECTATOR', '')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-bold text-sm text-primary">{msg.from}</div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground font-bold">{msg.time}</span>
                          </div>
                          <div className="text-sm pl-10 font-medium">{msg.text}</div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              )}
            </div>
          )}
        </main>

        <footer className="border-t-2 border-border bg-card/30 backdrop-blur-sm mt-12">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="font-bold">SYSTEM v2.4.1</span>
                <span className="flex items-center gap-1 font-bold">
                  <Icon name="Shield" size={12} />
                  ENCRYPTED
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 animate-pulse" />
                <span className="font-bold">CONNECTION ESTABLISHED</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
