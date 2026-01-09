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
  { id: 1, username: 'Player_12345', status: 'online', lastSeen: 'Сейчас', game: 'Adopt Me!', playtime: '247h', level: 89 },
  { id: 2, username: 'RobloxKid99', status: 'offline', lastSeen: '15 мин назад', game: 'Brookhaven', playtime: '183h', level: 45 },
  { id: 3, username: 'ProGamer2024', status: 'online', lastSeen: 'Сейчас', game: 'Blox Fruits', playtime: '512h', level: 142 },
  { id: 4, username: 'CoolDude777', status: 'ingame', lastSeen: 'В игре', game: 'Tower of Hell', playtime: '98h', level: 67 },
  { id: 5, username: 'BuildMaster', status: 'online', lastSeen: 'Сейчас', game: 'Build A Boat', playtime: '356h', level: 103 },
];

const mockMessages = [
  { id: 1, from: 'Player_12345', to: 'RobloxKid99', text: 'Видел что-то странное...', time: '14:32', read: true },
  { id: 2, from: 'ProGamer2024', to: 'Player_12345', text: 'За мной кто-то следит', time: '14:28', read: true },
  { id: 3, from: 'RobloxKid99', to: 'ProGamer2024', text: 'Что происходит?', time: '14:15', read: false },
  { id: 4, from: 'CoolDude777', to: 'BuildMaster', text: 'Нашел секретный код', time: '13:45', read: true },
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
  const [activeTab, setActiveTab] = useState('home');

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
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Eye" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold glitch">ROBLOX TRACKER</h1>
                  <p className="text-xs text-muted-foreground">СИСТЕМА МОНИТОРИНГА v2.4</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">АКТИВНО</span>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                  <Icon name="AlertTriangle" size={12} className="mr-1" />
                  CLASSIFIED
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <nav className="border-b border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex gap-1">
              {[
                { id: 'home', label: 'ГЛАВНАЯ', icon: 'Home' },
                { id: 'tracking', label: 'ОТСЛЕЖИВАНИЕ', icon: 'Crosshair' },
                { id: 'stats', label: 'СТАТИСТИКА', icon: 'BarChart3' },
                { id: 'messages', label: 'СООБЩЕНИЯ', icon: 'MessageSquare' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon as any} size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-6">
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'ВСЕГО ЦЕЛЕЙ', value: mockStats.totalTracked, icon: 'Users', color: 'text-blue-400' },
                  { label: 'ОНЛАЙН СЕЙЧАС', value: mockStats.activeNow, icon: 'Activity', color: 'text-green-400' },
                  { label: 'ПЕРЕХВАЧЕНО', value: mockStats.messagesIntercepted, icon: 'Mail', color: 'text-yellow-400' },
                  { label: 'ДАННЫХ', value: mockStats.dataCollected, icon: 'Database', color: 'text-purple-400' },
                ].map((stat, idx) => (
                  <Card key={idx} className="p-4 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Icon name={stat.icon as any} className={stat.color} size={24} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Radio" className="text-primary" size={20} />
                    АКТИВНЫЕ ЦЕЛИ
                  </h2>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {mockPlayers.filter(p => p.status === 'online' || p.status === 'ingame').length} ОНЛАЙН
                  </Badge>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {mockPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => setSelectedPlayer(player.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{player.username}</div>
                            <div className="text-xs text-muted-foreground">{player.game}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{player.playtime}</div>
                            <div className="text-xs text-muted-foreground">Уровень {player.level}</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
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
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Search" className="text-primary" size={20} />
                  ПОИСК ИГРОКА
                </h2>
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Введите username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-background border-border"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="ScanLine" size={16} className="mr-2" />
                    СКАНИРОВАТЬ
                  </Button>
                </div>

                <div className="space-y-3">
                  {filteredPlayers.map((player) => (
                    <Card key={player.id} className="p-4 bg-muted/50 border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-lg mb-1">{player.username}</div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant={player.status === 'online' || player.status === 'ingame' ? 'default' : 'secondary'}>
                                {player.status === 'online' ? 'ОНЛАЙН' : player.status === 'ingame' ? 'В ИГРЕ' : 'ОФФЛАЙН'}
                              </Badge>
                              <Badge variant="outline">Уровень {player.level}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>🎮 Последняя игра: {player.game}</div>
                              <div>⏱️ Наиграно: {player.playtime}</div>
                              <div>👁️ Последняя активность: {player.lastSeen}</div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-primary text-primary">
                          <Icon name="Eye" size={14} className="mr-1" />
                          ДЕТАЛИ
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" size={20} />
                    АКТИВНОСТЬ ПО ВРЕМЕНИ
                  </h2>
                  <div className="space-y-3">
                    {['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-00:00'].map((time, idx) => {
                      const percentage = [25, 45, 85, 70][idx];
                      return (
                        <div key={time}>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="text-muted-foreground">{time}</span>
                            <span className="font-medium">{percentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="bg-primary rounded-full h-3 transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Gamepad2" className="text-primary" size={20} />
                    ПОПУЛЯРНЫЕ ИГРЫ
                  </h2>
                  <div className="space-y-3">
                    {[
                      { name: 'Adopt Me!', players: 342 },
                      { name: 'Brookhaven', players: 278 },
                      { name: 'Blox Fruits', players: 195 },
                      { name: 'Tower of Hell', players: 156 },
                      { name: 'Build A Boat', players: 134 },
                    ].map((game) => (
                      <div key={game.name} className="flex items-center justify-between p-2 rounded bg-muted/30">
                        <span className="text-sm">{game.name}</span>
                        <Badge variant="secondary">{game.players} игроков</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="MapPin" className="text-primary" size={20} />
                  КАРТА АКТИВНОСТИ
                </h2>
                <div className="h-[300px] bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-1 p-4">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-primary rounded"
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
                    <p className="text-muted-foreground">ГЛОБАЛЬНОЕ ПОКРЫТИЕ</p>
                    <p className="text-2xl font-bold mt-2">{mockStats.activeNow} активных точек</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Wifi" className="text-primary" size={20} />
                    ПЕРЕХВАЧЕННЫЕ СООБЩЕНИЯ
                  </h2>
                  <Badge variant="destructive" className="animate-pulse">
                    <Icon name="Radio" size={12} className="mr-1" />
                    ПРОСЛУШКА АКТИВНА
                  </Badge>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {mockMessages.map((msg) => (
                      <Card key={msg.id} className="p-4 bg-muted/50 border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                {msg.from.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{msg.from}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Icon name="ArrowRight" size={10} />
                                {msg.to}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
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
            </div>
          )}
        </main>

        <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>СИСТЕМА v2.4.1</span>
                <span className="flex items-center gap-1">
                  <Icon name="Shield" size={12} />
                  ЗАШИФРОВАНО
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>СОЕДИНЕНИЕ УСТАНОВЛЕНО</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
