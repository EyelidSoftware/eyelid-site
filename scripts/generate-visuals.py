"""Generate original decorative UI artwork. No customer data or remote assets."""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/visuals"
OUT.mkdir(exist_ok=True)
MARK = re.search(r'<path[^>]*d="([^"]+)"', (ROOT / "public/brand/eyelid-mark.svg").read_text()).group(1)
PALETTES = {
    "dark": dict(bg="#101216", side="#14171c", surface="#1a1e25", inset="#14181e", border="#2c323d",
                 text="#f0f2f6", muted="#9ca7b8", soft="#647186", accent="#a3b8ff", tint="#29344c", good="#a3d8c0", warn="#e4c494"),
    "light": dict(bg="#f5f7fa", side="#ffffff", surface="#ffffff", inset="#edf1f7", border="#e1e6ef",
                  text="#202c40", muted="#6a7890", soft="#9ca9bc", accent="#4666a5", tint="#e9effb", good="#467e68", warn="#987544"),
}
class UI:
    def __init__(self, theme):
        self.p = PALETTES[theme]
        self.s = []
    def c(self, v):
        return self.p.get(v, v)
    def add(self, value):
        self.s.append(value)
    def rect(self, x,y,w,h,fill="surface",r=12,stroke="border"):
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{self.c(fill)}" stroke="{self.c(stroke)}"/>')
    def text(self,x,y,t,size=14,color="muted",weight=400):
        self.add(f'<text x="{x}" y="{y}" fill="{self.c(color)}" font-size="{size}" font-weight="{weight}">{escape(str(t))}</text>')
    def line(self,x,y,x2,y2,color="border",dash=""):
        self.add(f'<path d="M{x} {y}L{x2} {y2}" fill="none" stroke="{self.c(color)}" stroke-dasharray="{dash}"/>')
    def dot(self,x,y,r=3,color="soft"):
        self.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{self.c(color)}"/>')
    def pill(self,x,y,label,color="accent",w=None):
        w=w or len(label)*7+24
        self.rect(x,y,w,26,"tint",13,"tint")
        self.text(x+12,y+17,label,11,color)
    def icon(self,x,y,kind="grid",color="muted"):
        c=self.c(color)
        paths={"grid":'M0 0h6v6H0z M10 0h6v6h-6z M0 10h6v6H0z M10 10h6v6h-6z',
               "chart":'M0 15V0 M0 15h17 M4 10l4-4 4 2 5-7',
               "flow":'M8 0v4 M8 12v4 M1 4h14v8H1z M0 16h16',
               "doc":'M3 0h8l4 4v13H3z M6 7h6 M6 10h6 M6 13h4',
               "spark":'M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z'}
        self.add(f'<path d="{paths.get(kind,paths["grid"])}" transform="translate({x} {y})" fill="none" stroke="{c}" stroke-width="1.3" stroke-linejoin="round"/>')
    def shell(self, active, title, subtitle):
        self.rect(1,1,1198,868,"bg",20)
        self.rect(1,1,1198,42,"side",20)
        self.rect(1,24,1198,18,"side",0,"side")
        for i in range(3): self.dot(21+i*16,21,3.5)
        self.text(92,26,"workspace",11)
        self.text(1100,26,"⌘ K",11)
        self.line(1,43,1199,43)
        self.rect(1,44,200,825,"side",0,"side")
        self.line(201,44,201,870)
        self.add(f'<g transform="translate(15 51) scale(.19)"><path fill="{self.c("text")}" d="{MARK}"/></g>')
        self.text(66,82,"Workspace",16,"text",600)
        self.text(22,132,"ESPAÇO DA EQUIPE",9,"soft",600)
        nav=[("Visão geral","grid"),("Operação","doc"),("Automações","flow"),("Assistente","spark"),("Monitoramento","chart")]
        for i,(label,icon) in enumerate(nav):
            y=155+i*43
            selected=label==active
            if selected:self.rect(12,y-2,177,35,"tint",8,"tint")
            self.icon(24,y+7,icon,"accent" if selected else "muted")
            self.text(52,y+20,label,12,"accent" if selected else "muted",500 if selected else 400)
        self.text(22,425,"SEUS RECURSOS",9,"soft",600)
        for i,label in enumerate(["Documentos","Conexões","Equipe"]):
            self.dot(30,451+i*32,2.5)
            self.text(47,456+i*32,label,12)
        self.rect(14,740,172,57,"inset",9)
        self.dot(31,761,3,"good")
        self.text(43,766,"Ambiente conectado",10,"text")
        self.text(29,785,"Configurar integrações ↗",9)
        self.line(16,814,184,814)
        self.rect(20,829,27,27,"tint",8,"tint")
        self.text(27,847,"OP",9,"accent",600)
        self.text(57,841,"Equipe de operações",10,"text",500)
        self.text(57,856,"Meu espaço",9)
        self.text(230,78,"Workspace  /  "+active,11)
        self.rect(922,57,172,28,"inset",7,"border")
        self.text(935,75,"⌕  Buscar no workspace",10)
        self.dot(1152,71,14,"tint")
        self.text(1144,75,"OP",9,"accent",600)
        self.line(201,100,1199,100)
        self.text(232,145,title,27,"text",600)
        self.text(232,170,subtitle,12)
    def metric(self,x,y,w,label,value,detail,points=None):
        self.rect(x,y,w,114)
        self.text(x+18,y+28,label,11)
        self.text(x+18,y+69,value,30,"text",500)
        self.text(x+18,y+95,detail,9,"good")
        if points:
            d=" ".join(("M" if i==0 else "L")+f"{x+w-98+i*11} {y+70-v}" for i,v in enumerate(points))
            self.add(f'<path d="{d}" stroke="{self.c("accent")}" stroke-width="1.7" fill="none"/>')
    def chart(self,x,y,w,h):
        for i in range(4):
            yy=y+20+i*(h-42)/3
            self.line(x+30,yy,x+w-16,yy)
            self.text(x+1,yy+3,str(60-i*20),8,"soft")
        vals=[.73,.62,.66,.41,.46,.32,.44,.22,.31,.13,.22,.15]
        pts=[(x+35+i*(w-58)/(len(vals)-1),y+15+v*(h-45)) for i,v in enumerate(vals)]
        d=" ".join(("M" if i==0 else "L")+f"{a:.1f},{b:.1f}" for i,(a,b) in enumerate(pts))
        self.add(f'<path d="{d} L{x+w-23},{y+h-23} H{x+35}Z" fill="{self.c("tint")}" opacity=".6"/>')
        self.add(f'<path d="{d}" stroke="{self.c("accent")}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>')
        for i,label in enumerate(["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]):
            self.text(x+34+i*(w-65)/6,y+h-3,label,8,"soft")
    def export(self,name):
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="870" viewBox="0 0 1200 870"><defs><clipPath id="frame"><rect width="1200" height="870" rx="20"/></clipPath></defs><g clip-path="url(#frame)" font-family="Inter,Arial,sans-serif">'+''.join(self.s)+'</g></svg>'
        (OUT/(name+".svg")).write_text(svg)

def ring(u,x,y,r,value,label,color="accent"):
    u.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{u.c("inset")}" stroke-width="13"/>')
    length=2*3.14159265*r
    u.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{u.c(color)}" stroke-width="13" stroke-linecap="round" stroke-dasharray="{length*value:.1f} {length:.1f}" transform="rotate(-90 {x} {y})"/>')
    u.text(x-27,y+6,str(round(value*100))+"%",24,"text",500)
    u.text(x-30,y+26,label,9)
def avatar(u,x,y,letters,color="accent"):
    u.dot(x,y,12,"tint")
    u.text(x-7,y+3,letters,8,color,600)
def operations(u):
    u.shell("Operação","Sua equipe. No mesmo ritmo.","Uma visão clara do trabalho, das prioridades e do que vem a seguir.")
    u.pill(1037,127,"+ Criar atividade",w=129)
    u.metric(232,199,300,"Atividades em andamento","24","8 prontas para revisão",[3,10,8,17,12,22,29])
    u.metric(549,199,300,"Entregas desta semana","16","Atualizado pela equipe",[5,10,7,13,20,19,29])
    u.metric(866,199,300,"Pessoas conectadas","08","Comercial · Operação · Gestão",[4,7,9,8,13,13,16])
    u.rect(232,337,596,245)
    u.text(254,369,"O trabalho avança.",17,"text",600)
    u.text(254,390,"Atividades concluídas ao longo da semana",10)
    u.pill(697,353,"Semana",w=105)
    u.chart(253,402,554,163)
    u.rect(848,337,318,245)
    u.text(870,370,"Tudo em perspectiva",16,"text",600)
    ring(u,934,469,56,.72,"concluído")
    for i,(label,color,value) in enumerate([("Concluídas","accent","16"),("Em revisão","good","06"),("Na fila","soft","02")]):
        y=431+i*41
        u.dot(1016,y,3,color)
        u.text(1028,y+4,label,10)
        u.text(1133,y+4,value,11,"text",500)
    u.text(232,626,"Em foco hoje",17,"text",600)
    u.text(1065,625,"Ver quadro ↗",10,"accent")
    for i,(status,title,team,progress,color) in enumerate([
        ("EM REVISÃO","Proposta comercial","Equipe comercial",.76,"accent"),
        ("EM ANDAMENTO","Aprovação de compras","Equipe de operação",.48,"good"),
        ("PRÓXIMA ENTREGA","Portal de atendimento","Produto e experiência",.30,"warn")]):
        x=232+i*317
        u.rect(x,647,300,169)
        u.dot(x+21,673,3,color)
        u.text(x+32,677,status,8,color,600)
        u.text(x+19,710,title,17,"text",500)
        u.text(x+19,733,team,10)
        u.rect(x+19,751,262,4,"inset",2,"inset")
        u.rect(x+19,751,262*progress,4,color,2,color)
        avatar(u,x+31,789,["AC","BR","DS"][i])
        avatar(u,x+50,789,["CM","EF","GH"][i])
        u.text(x+196,793,["Hoje, 14:00","Acompanhar ↗","Ver detalhes ↗"][i],9)
def automation(u):
    u.shell("Automações","Conexões que fazem o trabalho fluir.","Regras, pessoas e sistemas no mesmo fluxo, com cada etapa visível.")
    u.pill(1044,127,"✓ Fluxo ativo","good",122)
    u.rect(232,199,934,44)
    for i,l in enumerate(["Editor do fluxo","Histórico","Conexões"]):u.text(253+i*150,226,l,11,"accent" if i==0 else "muted",500)
    u.text(1010,226,"✓ Alterações salvas",9,"good")
    u.rect(232,259,625,557,"inset")
    u.add(f'<defs><pattern id="canvas" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="{u.c("border")}"/></pattern></defs><rect x="233" y="260" width="623" height="555" rx="12" fill="url(#canvas)"/>')
    for d in ["M545 364V411","M545 492V513Q545 529 512 529H412Q392 529 392 549","M545 492V513Q545 529 580 529H688Q710 529 710 549","M392 631V655Q392 671 425 671H545V708","M710 631V655Q710 671 674 671H545"]:
        u.add(f'<path d="{d}" fill="none" stroke="{u.c("accent")}" stroke-width="2" opacity=".6"/>')
    def node(x,y,w,title,sub,icon,color="accent"):
        u.rect(x,y,w,79)
        u.rect(x+14,y+19,38,38,"tint",10,"tint")
        u.icon(x+25,y+30,icon,color)
        u.text(x+64,y+32,title,13,"text",500)
        u.text(x+64,y+53,sub,9)
        u.dot(x+w-14,y+15,3,"good")
        u.dot(x+w/2,y+79,3,color)
    node(400,284,290,"Nova solicitação","Gatilho · Formulário ou API","flow")
    node(400,413,290,"Validar informações","Condição · Regras da operação","doc")
    u.pill(347,517,"Aprovação",w=89)
    u.pill(667,517,"Revisão",w=88)
    node(268,551,248,"Aprovar pedido","Ação · Responsável da área","spark","good")
    node(584,551,248,"Revisar contexto","Ação · Análise da equipe","doc","warn")
    node(400,709,290,"Atualizar sistema","Integração · Operação","grid")
    u.rect(248,769,95,29,"surface",7)
    u.text(265,788,"−   100%   +",10)
    u.rect(877,259,289,557)
    u.text(897,293,"Pronto para acontecer.",16,"text",600)
    u.text(897,316,"Veja cada passo da execução.",10)
    u.rect(894,338,255,100,"inset",9)
    u.dot(916,363,4,"good")
    u.text(930,367,"Execução concluída",12,"text",500)
    u.text(911,393,"Todas as etapas foram processadas.",10)
    u.text(911,417,"Hoje, 09:42  ·  Ver histórico ↗",9,"accent")
    u.text(897,474,"CAMINHO DA EXECUÇÃO",9,"soft",600)
    for i,(a,b) in enumerate([("Solicitação recebida","Origem identificada"),("Informações validadas","Regras conferidas"),("Aprovação registrada","Responsável da área"),("Sistema atualizado","Conexão confirmada")]):
        y=510+i*61
        u.dot(907,y-4,4,"good")
        if i<3:u.line(907,y+3,907,y+47)
        u.text(923,y,a,11,"text",500)
        u.text(923,y+19,b,9)
    u.pill(897,775,"3 conexões disponíveis","accent",249)
def assistant(u):
    u.shell("Assistente","Do conhecimento à próxima decisão.","Explore documentos, conecte informações e trabalhe com mais contexto.")
    u.pill(1038,127,"+ Nova conversa",w=128)
    u.rect(232,199,425,617)
    u.text(253,233,"Assistente da equipe",15,"text",600)
    u.dot(630,228,4,"good")
    u.line(233,252,656,252)
    u.rect(275,278,362,72,"tint",13,"tint")
    u.text(291,307,"O que merece atenção na operação",12,"text",500)
    u.text(291,328,"esta semana?",12,"text",500)
    u.rect(251,380,31,31,"tint",9,"tint")
    u.icon(259,388,"spark","accent")
    u.text(295,400,"Vamos olhar o contexto.",13,"text",600)
    for i,t in enumerate(["Organizei os pontos do relatório em uma","visão resumida. Você pode conferir as","fontes e continuar a análise por aqui."]):u.text(295,429+i*24,t,11,"text")
    for i,(a,b) in enumerate([("Prioridades","3 pontos para acompanhar"),("Responsáveis","Identificados por etapa"),("Próximas ações","Organizadas no documento")]):
        y=534+i*49
        u.dot(302,y-4,3,"accent")
        u.text(315,y,a,11,"text",500)
        u.text(315,y+18,b,9)
    u.rect(295,690,339,39,"inset",8)
    u.icon(307,700,"doc")
    u.text(332,714,"Relatório operacional · Abrir fonte ↗",9,"accent")
    u.rect(251,751,387,45,"inset",11)
    u.text(266,778,"Continue a conversa…",11)
    u.pill(591,760,"↑",w=29)
    u.rect(676,199,490,617)
    u.text(698,232,"DOCUMENTO EM FOCO",9,"soft",600)
    u.text(1089,232,"↗ Abrir",10,"accent")
    u.line(677,252,1165,252)
    u.pill(704,277,"Análise da operação","accent",163)
    u.text(704,339,"Uma visão mais clara",27,"text",500)
    u.text(704,372,"da sua semana.",27,"text",500)
    u.text(704,401,"Contexto, prioridades e caminhos para agir.",11)
    u.line(704,424,1137,424)
    for i,(label,val) in enumerate([("EM FOCO","03"),("CONCLUÍDAS","16"),("EQUIPE","08")]):
        x=704+i*149
        u.text(x,449,label,8,"soft",600)
        u.text(x,484,val,27,"text",500)
    u.text(704,532,"Prioridades por área",12,"text",600)
    for i,(label,w) in enumerate([("Operação",305),("Comercial",221),("Atendimento",157)]):
        y=559+i*41
        u.text(704,y,label,9)
        u.rect(704,y+8,421,8,"inset",4,"inset")
        u.rect(704,y+8,w,8,"accent" if i==0 else "tint",4,"accent" if i==0 else "tint")
    u.rect(704,697,434,90,"inset",10)
    u.icon(720,713,"doc")
    u.text(748,727,"Fontes para continuar",12,"text",500)
    u.text(722,754,"Relatório semanal    ·    Histórico de atividades",10)
    u.text(722,774,"Informações do espaço autorizado da equipe",9,"soft")
def monitoring(u):
    u.shell("Monitoramento","Uma operação com tudo à vista.","Sinais, conexões e atividades para saber onde agir.")
    u.pill(1036,127,"Últimos 7 dias",w=130)
    u.rect(232,199,934,287)
    u.dot(254,226,4,"good")
    u.text(268,231,"Operação conectada",12,"text",500)
    u.pill(1016,213,"12 fluxos ativos","good",128)
    u.text(253,279,"1.248",44,"text",500)
    u.text(401,276,"execuções acompanhadas",12)
    u.text(253,307,"Continuidade entre seus sistemas e sua equipe.",10)
    u.chart(253,325,889,145)
    u.rect(232,506,449,309)
    u.text(253,539,"Ritmo da operação",17,"text",600)
    u.text(253,560,"Atividade por horário e dia da semana",10)
    for i,label in enumerate(["SEG","TER","QUA","QUI","SEX"]):
        u.text(253,593+i*30,label,8,"soft")
        for j in range(13):
            opacity=[.15,.28,.45,.68,.9][(i*3+j*7+j*j)%5]
            u.add(f'<rect x="{292+j*27}" y="{580+i*30}" width="20" height="20" rx="4" fill="{u.c("accent")}" opacity="{opacity}"/>')
    u.text(293,755,"08h",8,"soft");u.text(451,755,"14h",8,"soft");u.text(605,755,"20h",8,"soft")
    u.text(253,792,"Menor atividade",9)
    for j in range(5):u.add(f'<rect x="{455+j*20}" y="780" width="14" height="14" rx="3" fill="{u.c("accent")}" opacity="{.15+j*.18}"/>')
    u.text(571,792,"Maior",9)
    u.rect(701,506,465,309)
    u.text(722,539,"Onde sua atenção faz diferença.",16,"text",600)
    for i,(title,sub,tag,color) in enumerate([
        ("Aprovação aguardando revisão","Operação · Responsável identificado","Acompanhar","warn"),
        ("Sincronização concluída","Integrações · Atualizado agora","Concluída","good"),
        ("Base de conhecimento atualizada","Documentos · Novas fontes disponíveis","Disponível","accent")]):
        y=581+i*76
        u.line(722,y-16,1146,y-16)
        u.dot(730,y+3,4,color)
        u.text(745,y+2,title,12,"text",500)
        u.text(745,y+23,sub,9)
        u.pill(745,y+34,tag,color,112)

for theme in PALETTES:
    for name,draw in [("operacao",operations),("automacao",automation),("assistente",assistant),("monitoramento",monitoring)]:
        ui=UI(theme)
        draw(ui)
        ui.export(name+("-claro" if theme=="light" else ""))
print("8 interfaces vetoriais geradas: quatro soluções em dois temas.")
