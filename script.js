console.log('Handshake Dashboard loaded');

// Variables globales pour D3.js
let graphData = { nodes: [], links: [] };
let svg, simulation, link, node, nodeGroup, linkGroup;
let filteredData = { nodes: [], links: [] };

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initializing...');
    
    // Initialiser les interactions de base
    initModeTabs();
    initTimeline();
    initFilters();
    
    // Charger et initialiser le réseau D3.js
    loadNetworkData();
    
    console.log('Dashboard initialized');
});

// Charger les données du réseau depuis le fichier JSON
async function loadNetworkData() {
    try {
        const response = await fetch('data/nodes.json');
        graphData = await response.json();
        console.log("Données du réseau chargées :", graphData);
        
        // Initialiser les données filtrées avec toutes les données
        filteredData = {
            nodes: [...graphData.nodes],
            links: [...graphData.links]
        };
        
        // Rendre le réseau
        renderNetwork();
        
        // Mettre à jour le classement d'influence
        updateInfluenceRanking();
        
    } catch (error) {
        console.error("Erreur de chargement des données :", error);
        // Données de secours
        graphData = {
            nodes: [
                { id: "Test1", name: "Nœud Test 1", score: 100, region: "Test", category: "ONG", influence: 100, connections: 3 },
                { id: "Test2", name: "Nœud Test 2", score: 80, region: "Test", category: "Influenceur", influence: 80, connections: 2 },
            ],
            links: [
                { source: "Test1", target: "Test2", value: 1, strength: 0.5 },
            ]
        };
        filteredData = { nodes: [...graphData.nodes], links: [...graphData.links] };
        renderNetwork();
        updateInfluenceRanking();
    }
}

// Rendre le réseau D3.js
function renderNetwork() {
    const container = document.getElementById('network-container');
    if (!container) {
        console.error('Conteneur réseau non trouvé');
        return;
    }
    
    // Nettoyer le conteneur
    container.innerHTML = '';
    
    // Obtenir les dimensions du conteneur
    const rect = container.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 600;
    
    // Créer le SVG
    svg = d3.select('#network-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .style('background', 'transparent');
    
    // Créer les groupes pour les liens et les nœuds
    linkGroup = svg.append('g').attr('class', 'links');
    nodeGroup = svg.append('g').attr('class', 'nodes');
    
    // Créer la simulation de force
    simulation = d3.forceSimulation(filteredData.nodes)
        .force('link', d3.forceLink(filteredData.links)
            .id(d => d.id)
            .distance(d => 100 + (d.value * 20))
            .strength(d => d.strength || 0.5))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.influence) + 10));
    
    // Créer les liens
    link = linkGroup.selectAll('.link')
        .data(filteredData.links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', '#666')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.sqrt(d.value) * 2);
    
    // Créer les nœuds
    node = nodeGroup.selectAll('.node')
        .data(filteredData.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(drag(simulation));
    
    // Ajouter les cercles aux nœuds
    node.append('circle')
        .attr('r', d => Math.sqrt(d.influence) / 2 + 5)
        .attr('fill', d => getNodeColor(d.category))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    
    // Ajouter les labels aux nœuds
    node.append('text')
        .text(d => d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name)
        .attr('dy', 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#fff')
        .style('font-weight', 'bold');
    
    // Ajouter les scores
    node.append('text')
        .text(d => d.score)
        .attr('dy', 40)
        .attr('text-anchor', 'middle')
        .style('font-size', '8px')
        .style('fill', '#ccc');
    
    // Mettre à jour les positions lors de la simulation
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
    });
    
    // Ajouter des interactions aux nœuds
    node
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .on('click', handleNodeClick);
}

// Obtenir la couleur d'un nœud selon sa catégorie
function getNodeColor(category) {
    const colors = {
        'ONG': '#4CAF50',
        'Influenceur': '#2196F3',
        'Institution': '#FF9800',
        'Fondation': '#9C27B0',
        'Entreprise': '#F44336'
    };
    return colors[category] || '#9E9E9E';
}

// Gestion du drag and drop
function drag(simulation) {
    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// Gestion des événements de souris
function handleMouseOver(event, d) {
    // Mettre en évidence le nœud
    d3.select(this).select('circle')
        .attr('stroke', '#FFD700')
        .attr('stroke-width', 3);
    
    // Mettre en évidence les connexions
    link.style('stroke', l => 
        (l.source.id === d.id || l.target.id === d.id) ? '#FFD700' : '#666')
        .style('stroke-width', l => 
            (l.source.id === d.id || l.target.id === d.id) ? 3 : Math.sqrt(l.value) * 2);
}

function handleMouseOut(event, d) {
    // Restaurer l'apparence normale
    d3.select(this).select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    
    link.style('stroke', '#666')
        .style('stroke-width', d => Math.sqrt(d.value) * 2);
}

function handleNodeClick(event, d) {
    console.log('Nœud cliqué:', d);
    // Ici vous pouvez ajouter des actions spécifiques
    // Par exemple, afficher des détails dans un modal
}

// Appliquer les filtres
function applyFilters() {
    const minScore = parseInt(document.querySelector('.score-slider').value);
    const selectedActor = document.querySelector('.actors-select').value;
    const selectedRegion = document.querySelector('.geographic-select').value;
    
    // Filtrer les nœuds
    let filteredNodes = graphData.nodes.filter(node => {
        const scoreMatch = node.score >= minScore;
        const actorMatch = selectedActor === 'All' || node.category === selectedActor;
        const regionMatch = selectedRegion === 'All' || node.region === selectedRegion;
        return scoreMatch && actorMatch && regionMatch;
    });
    
    // Filtrer les liens pour ne garder que ceux entre nœuds visibles
    const filteredLinks = graphData.links.filter(link => {
        const sourceVisible = filteredNodes.some(node => node.id === link.source);
        const targetVisible = filteredNodes.some(node => node.id === link.target);
        return sourceVisible && targetVisible;
    });
    
    // Mettre à jour les données filtrées
    filteredData = { nodes: filteredNodes, links: filteredLinks };
    
    // Mettre à jour le réseau
    updateNetwork();
    
    // Mettre à jour le classement
    updateInfluenceRanking();
}

// Mettre à jour le réseau avec les nouvelles données
function updateNetwork() {
    if (!simulation) return;
    
    // Mettre à jour la simulation
    simulation.nodes(filteredData.nodes);
    simulation.force('link').links(filteredData.links);
    
    // Mettre à jour les nœuds
    node = nodeGroup.selectAll('.node')
        .data(filteredData.nodes, d => d.id);
    
    // Supprimer les nœuds qui ne sont plus dans les données
    node.exit().remove();
    
    // Ajouter les nouveaux nœuds
    const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .call(drag(simulation));
    
    nodeEnter.append('circle')
        .attr('r', d => Math.sqrt(d.influence) / 2 + 5)
        .attr('fill', d => getNodeColor(d.category))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    
    nodeEnter.append('text')
        .text(d => d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name)
        .attr('dy', 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#fff')
        .style('font-weight', 'bold');
    
    nodeEnter.append('text')
        .text(d => d.score)
        .attr('dy', 40)
        .attr('text-anchor', 'middle')
        .style('font-size', '8px')
        .style('fill', '#ccc');
    
    // Fusionner les nœuds existants et nouveaux
    node = nodeEnter.merge(node);
    
    // Mettre à jour les liens
    link = linkGroup.selectAll('.link')
        .data(filteredData.links, d => `${d.source.id}-${d.target.id}`);
    
    link.exit().remove();
    
    link.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', '#666')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.sqrt(d.value) * 2)
        .merge(link);
    
    // Ajouter les interactions
    node
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .on('click', handleNodeClick);
    
    // Redémarrer la simulation
    simulation.alpha(0.3).restart();
}

// Mettre à jour le classement d'influence
function updateInfluenceRanking() {
    const rankingList = document.querySelector('.ranking-list');
    if (!rankingList) return;
    
    // Trier les nœuds par score d'influence
    const sortedNodes = [...filteredData.nodes].sort((a, b) => b.influence - a.influence);
    
    // Créer le HTML du classement
    rankingList.innerHTML = sortedNodes.slice(0, 10).map((node, index) => `
        <div class="ranking-item" style="background: ${getNodeColor(node.category)}20; border-left: 3px solid ${getNodeColor(node.category)};">
            <div class="ranking-position">${index + 1}</div>
            <div class="ranking-info">
                <div class="ranking-name">${node.name}</div>
                <div class="ranking-score">${node.influence} pts</div>
            </div>
        </div>
    `).join('');
}

// Gestion des onglets de mode
function initModeTabs() {
    const modeTabs = document.querySelectorAll('.mode-tab');
    
    modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Retirer la classe active de tous les onglets
            modeTabs.forEach(t => t.classList.remove('active'));
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            console.log('Mode changed to:', this.textContent);
            
            // Ici vous pouvez ajouter la logique pour changer entre Network et Heatmap
            if (this.textContent === 'Heatmap') {
                // Logique pour passer en mode heatmap
                console.log('Switching to heatmap mode');
            } else {
                // Logique pour revenir au mode réseau
                console.log('Switching to network mode');
            }
        });
    });
}

// Gestion de la timeline
function initTimeline() {
    const playhead = document.querySelector('.playhead');
    const timelineSlider = document.querySelector('.timeline-track');
    
    if (playhead && timelineSlider) {
        // Animation du playhead
        let position = 0;
        let direction = 1;
        
        setInterval(() => {
            position += direction * 0.5;
            if (position >= 100) {
                position = 100;
                direction = -1;
            } else if (position <= 0) {
                position = 0;
                direction = 1;
            }
            
            playhead.style.left = position + '%';
        }, 100);
    }
}

// Gestion des filtres
function initFilters() {
    const scoreSlider = document.querySelector('.score-slider');
    const scoreMin = document.querySelector('.score-min');
    const scoreMax = document.querySelector('.score-max');
    const actorsSelect = document.querySelector('.actors-select');
    const geographicSelect = document.querySelector('.geographic-select');
    
    // Mettre à jour les options des sélecteurs
    if (actorsSelect) {
        const categories = [...new Set(graphData.nodes.map(node => node.category))];
        actorsSelect.innerHTML = '<option value="All">All</option>' + 
            categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }
    
    if (geographicSelect) {
        const regions = [...new Set(graphData.nodes.map(node => node.region))];
        geographicSelect.innerHTML = '<option value="All">All</option>' + 
            regions.map(region => `<option value="${region}">${region}</option>`).join('');
    }
    
    // Gestion du slider de score
    if (scoreSlider && scoreMin && scoreMax) {
        scoreSlider.addEventListener('input', function() {
            const value = this.value;
            scoreMin.textContent = Math.max(0, value - 20);
            scoreMax.textContent = Math.min(100, parseInt(value) + 20);
            
            // Appliquer les filtres
            applyFilters();
        });
    }
    
    // Gestion des sélecteurs
    if (actorsSelect) {
        actorsSelect.addEventListener('change', applyFilters);
    }
    
    if (geographicSelect) {
        geographicSelect.addEventListener('change', applyFilters);
    }
}

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    if (svg && simulation) {
        const container = document.getElementById('network-container');
        const rect = container.getBoundingClientRect();
        const width = rect.width || 800;
        const height = rect.height || 600;
        
        svg.attr('width', width).attr('height', height);
        simulation.force('center', d3.forceCenter(width / 2, height / 2));
        simulation.alpha(0.3).restart();
    }
});

// Animation d'entrée des éléments
function animateElements() {
    const elements = document.querySelectorAll('.header-zone, .main-container, .timeline-zone');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Lancer l'animation d'entrée
setTimeout(animateElements, 100);