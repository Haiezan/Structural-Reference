# 附录A 示例文件
![](../images/arrow.gif)
本附录包含书中各章节使用的ABAQUS脚本文件。这些脚本可在ABAQUS/CAE中直接运行生成相应的模型。

---

## A.1 悬挂起重机框架 (Overhead hoist frame)

**脚本文件：** `gsi_frame_caemodel.py`

**说明：** 本脚本创建了一个二维平面悬挂起重机框架模型，包含静态分析和显式动力学分析两种模型。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for frame example
#

from abaqus import *
from abaqusConstants import *
session.viewports['Viewport: 1'].makeCurrent()
session.viewports['Viewport: 1'].maximize()
session.journalOptions.setValues(replayGeometry=COORDINATE,
    recoverGeometry=COORDINATE)
from caeModules import *
from driverUtils import executeOnCaeStartup
executeOnCaeStartup()
Mdb()

mdb.models.changeKey(fromName='Model-1', toName='standard')

##
##  Sketch profile of frame
##
s = mdb.models['standard'].ConstrainedSketch(name='__profile__', sheetSize=4.0)
g, v, d, c = s.geometry, s.vertices, s.dimensions, s.constraints
s.setPrimaryObject(option=STANDALONE)
s.rectangle(point1=(-0.4, -0.2), point2=(0.4, 0.4))
s.delete(objectList=(c[18], c[21], c[19], c[20]))
s.ParallelConstraint(entity1=g.findAt((0.0, 0.4)), entity2=g.findAt((0.0,
    -0.2)))
s.HorizontalDimension(vertex1=v.findAt((-0.4, 0.4)), vertex2=v.findAt((0.4,
    0.4)), textPoint=(0.350665062665939, 0.510207295417786), value=1.0)
s.HorizontalDimension(vertex1=v.findAt((-0.4, -0.2)), vertex2=v.findAt((0.4,
    -0.2)), textPoint=(0.299293786287308, -0.478947371244431), value=2.0)
s.ObliqueDimension(vertex1=v.findAt((0.4, 0.4)), vertex2=v.findAt((0.4,
    -0.2)), textPoint=(0.589653432369232, 0.0547049306333065), value=1.0)
s.ObliqueDimension(vertex1=v.findAt((-1.6, -0.2)), vertex2=v.findAt((0.2,
    0.4)), textPoint=(-0.524880945682526, 0.353907465934753), value=1.0)
session.viewports['Viewport: 1'].view.fitView()
s.Line(point1=(-0.45, 0.533012701892263), point2=(-0.15, -0.333012701892264))
s.CoincidentConstraint(entity1=v.findAt((-0.15, -0.333013)), entity2=g.findAt(
    (0.05, -0.333013)), addUndoState=False)
s.Line(point1=(-0.15, -0.333012701892264), point2=(0.55, 0.533012701892263))
s.breakCurve(curve1=g.findAt((0.05, -0.333013)), point1=(-0.247599363327026,
    -0.332068353891373), curve2=g.findAt((-0.3, 0.1)), point2=(
    -0.158276319503784, -0.259217292070389))
s.EqualLengthConstraint(entity1=g.findAt((-0.3, 0.1)), entity2=g.findAt((0.2,
    0.1)))
s.HorizontalConstraint(entity=g.findAt((-0.485701, -0.38399)))
s.HorizontalConstraint(entity=g.findAt((0.514299, -0.306365)))
p = mdb.models['standard'].Part(name='Frame', dimensionality=TWO_D_PLANAR,
    type=DEFORMABLE_BODY)
p = mdb.models['standard'].parts['Frame']
p.BaseWire(sketch=s)
s.unsetPrimaryObject()
p = mdb.models['standard'].parts['Frame']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
del mdb.models['standard'].sketches['__profile__']
##
##  Create material 'Steel'
##
mdb.models['standard'].Material('Steel')
mdb.models['standard'].materials['Steel'].Elastic(table=((200.E9, 0.3), ))
##
##  Create truss section
##
mdb.models['standard'].TrussSection(name='FrameSection', material='Steel',
    area=1.963E-05)
##
##  Assign truss section
##
e = p.edges
edges = e
region = regionToolset.Region(edges=edges)
p.SectionAssignment(region=region, sectionName='FrameSection')

a = mdb.models['standard'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
##
##  Set coordinate system (done by default)
##
a = mdb.models['standard'].rootAssembly
a.DatumCsysByDefault(CARTESIAN)
##
##  Instance the frame
##
p = mdb.models['standard'].parts['Frame']
a.Instance(name='Frame-1', part=p, dependent=ON)
p1 = a.instances['Frame-1']
p1.translate(vector=(-0.035794, 0.331227, 0.0))
##
##  Create a static linear perturbation step
##
mdb.models['standard'].StaticLinearPerturbationStep(name='Apply load',
    previous='Initial', description='10kN central load',
    matrixSolver=SOLVER_DEFAULT)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Apply load')
mdb.models['standard'].fieldOutputRequests['F-Output-1'].setValues(
    variables=PRESELECT, region=MODEL)
##
##  Apply concentrated force to bottom center
##
v = a.instances['Frame-1'].vertices
region=((v.findAt(((0.0, 0.0, 0.0), ), ), ), )
mdb.models['standard'].ConcentratedForce(name='Force',
    createStepName='Apply load',
    region=region, cf2=-10000.0)
##
##  Apply encastre bc to bottom left corner
##
region=(v.findAt(((-1.0, 0.0, 0.0), ), ), None, None, None)
mdb.models['standard'].EncastreBC(name='Fixed', createStepName='Initial',
    region=region)
##
##  Apply roller bc to bottom right corner
##
region=(v.findAt(((1.0, 0.0, 0.0), ), ), None, None, None)
mdb.models['standard'].DisplacementBC(name='Roller',
    createStepName='Initial', region=region, u2=0.0)
##
##  Assign global seed
##
p.seedPart(size=1.0)
##
##  Assign element type
##
elemType1 = mesh.ElemType(elemCode=T2D2)
e = p.edges
edges = e
pickedRegions =(edges, )
p.setElementType(regions=pickedRegions, elemTypes=(elemType1, ))
##
##  Generate mesh
##
p.generateMesh()
##
##  Create job
##
mdb.Job(name='Frame', model='standard',
    description='Two-dimensional overhead hoist frame')
mdb.jobs['Frame'].setValues(echoPrint=ON, modelPrint=ON, contactPrint=ON,
    historyPrint=ON)

session.viewports['Viewport: 1'].view.fitView()

##
##  Save model database
##
mdb.saveAs('Frame')

##
##  Create explicit dynamics model
##
mdb.Model(name='explicit', objectToCopy=mdb.models['standard'])

##
##  add density
##
mdb.models['explicit'].materials['Steel'].Density(table=((7800.0, ), ))

a = mdb.models['explicit'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)

##
##  replace static step with explicit dynamics step
##  add new history output requests
##
mdb.models['explicit'].ExplicitDynamicsStep(name='Apply load',
    previous='Initial', maintainAttributes=True, timePeriod=0.01)

v = a.instances['Frame-1'].vertices
verts = v.findAt(((0.0, 0.0, 0.0), ))
a.Set(vertices=verts, name='Center')

regionDef=mdb.models['explicit'].rootAssembly.sets['Center']
mdb.models['explicit'].historyOutputRequests['H-Output-1'].setValues(
    variables=('UT', ), region=regionDef, frequency=1)
##
#  change element library to EXPLICIT
##
elemType1 = mesh.ElemType(elemCode=T2D2, elemLibrary=EXPLICIT)
p = mdb.models['explicit'].parts['Frame']
e = p.edges
edges = e
p.setElementType(regions=pickedRegions, elemTypes=(elemType1, ))

##
##  create job
##
mdb.Job(name='expFrame', model='explicit', type=ANALYSIS,
    description='Two-dimensional overhead hoist frame-explicit dynamics')

a = mdb.models['standard'].rootAssembly
a.regenerate()
a = mdb.models['explicit'].rootAssembly
a.regenerate()

mdb.save()
```

---

## A.2 连接吊环 (Connecting lug)

**脚本文件：** `gsi_lug_caemodel.py`

**说明：** 本脚本创建了一个线性弹性钢制连接吊环模型，包含静态分析和显式动力学分析两种分析类型。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for elastic lug example
#
from abaqus import *
from abaqusConstants import *
session.viewports['Viewport: 1'].makeCurrent()
session.viewports['Viewport: 1'].maximize()
session.journalOptions.setValues(replayGeometry=COORDINATE,
    recoverGeometry=COORDINATE)
from caeModules import *
from driverUtils import executeOnCaeStartup
executeOnCaeStartup()
Mdb()

mdb.models.changeKey(fromName='Model-1', toName='standard')

session.viewports['Viewport: 1'].setValues(displayedObject=None)

##  Sketch profile of the lug

s = mdb.models['standard'].ConstrainedSketch(name='__profile__',
    sheetSize=0.25)
g, v, d, c = s.geometry, s.vertices, s.dimensions, s.constraints
s.sketchOptions.setValues(decimalPlaces=3)
s.setPrimaryObject(option=STANDALONE)
s.rectangle(point1=(-0.0275, 0.0225), point2=(0.02125, -0.01375))
s.delete(objectList=(g.findAt((0.02125, 0.004375)), ))
s.EqualLengthConstraint(entity1=g.findAt((-0.003125, -0.01375)),
    entity2=g.findAt((-0.003125, 0.0225)))
s.ObliqueDimension(vertex1=v.findAt((-0.0275, -0.01375)), vertex2=v.findAt((
    0.02125, -0.01375)), textPoint=(-0.010330107063055, -0.023654306307435),
    value=0.1)
s.move(vector=(-0.025625, 0.0), objectList=(g.findAt((-0.0275, 0.004375)),
    g.findAt((0.0225, -0.01375)), g.findAt((0.0225, 0.0225))))
session.viewports['Viewport: 1'].view.fitView()
s.ObliqueDimension(vertex1=v.findAt((-0.053125, 0.0225)), vertex2=v.findAt((
    -0.053125, -0.01375)), textPoint=(-0.0564765408635139,
    0.00896133482456207), value=0.05)
session.viewports['Viewport: 1'].view.fitView()
session.viewports['Viewport: 1'].view.setValues(nearPlane=0.230597,
    farPlane=0.279546, width=0.144889, height=0.121934)
s.Arc3Points(point1=(0.046875, 0.03625), point2=(0.046875, -0.01375), point3=(
    0.0625, 0.02375))
s.TangentConstraint(entity1=g.findAt((-0.003125, 0.03625)), entity2=g.findAt((
    0.0657, 0.01125)))
s.move(vector=(-0.001797, 0.0), objectList=(g.findAt((-0.053125, 0.01125)),
    g.findAt((-0.003125, -0.01375)), g.findAt((-0.003125, 0.03625)), g.findAt((
    0.071875, 0.01125))))
s.TangentConstraint(entity1=g.findAt((-0.004922, -0.01375)), entity2=g.findAt((
    0.070078, 0.01125)))
session.viewports['Viewport: 1'].view.fitView()
s.RadialDimension(curve=g.findAt((0.070078, 0.01125)), textPoint=(
    0.0655877739191055, -0.0193991288542748), radius=0.025)
d[2].setValues(reference=ON)
s.CircleByCenterPerimeter(center=(0.0425, 0.0125), point1=(0.0525, 0.01625))
s.ConcentricConstraint(entity1=g.findAt((0.0325, 0.00875)), entity2=g.findAt((
    0.070078, 0.01125)))
s.RadialDimension(curve=g.findAt((0.035078, 0.0075)), textPoint=(
    0.0297759883105755, 0.0219836011528969), radius=0.015)
s.VerticalDimension(vertex1=v.findAt((0.045078, 0.01125)), vertex2=v.findAt((
    0.059123, 0.016517)), textPoint=(0.0632773488759995, 0.0129371425136924),
    value=0.0)
s.VerticalDimension(vertex1=v.findAt((0.045078, 0.01125)), vertex2=v.findAt((
    0.067003, 0.023263)), textPoint=(0.0746369957923889, 0.012744665145874),
    value=0.0)
s.move(vector=(0.034922, 0.00375), objectList=(g.findAt((-0.054922, 0.01125)),
    g.findAt((-0.004922, -0.01375)), g.findAt((-0.004922, 0.03625)),
    g.findAt((0.070078, 0.01125)), g.findAt((0.030078, 0.01125))))
p = mdb.models['standard'].Part(name='Lug', dimensionality=THREE_D,
    type=DEFORMABLE_BODY)
p = mdb.models['standard'].parts['Lug']
p.BaseSolidExtrude(sketch=s, depth=0.02)
s.unsetPrimaryObject()
p = mdb.models['standard'].parts['Lug']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
del mdb.models['standard'].sketches['__profile__']

c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums


##
##  Create material 'Steel'
##
mdb.models['standard'].Material('Steel')
mdb.models['standard'].materials['Steel'].Elastic(table=((200.0E9, 0.3), ))
##
##  Create solid section
##
mdb.models['standard'].HomogeneousSolidSection(name='LugSection',
    material='Steel', thickness=1.0)
##
##  Assign solid section
##
c = p.cells
cells = c
region = regionToolset.Region(cells=cells)
p.SectionAssignment(region=region, sectionName='LugSection', offset=0.0)
##
##  Set coordinate system (done by default)
##
a = mdb.models['standard'].rootAssembly
a.DatumCsysByDefault(CARTESIAN)
##
##  Instance the lug
##
a.Instance(name='Lug-1', part=p, dependent=ON)
##
##  Create a static general step
##
mdb.models['standard'].StaticStep(name='LugLoad',
    previous='Initial', description='Apply uniform pressure to the hole')
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='LugLoad')
##
##  Modify output requests
##
mdb.models['standard'].fieldOutputRequests['F-Output-1'].setValues(
    variables=('S', 'U', 'RF', 'NFORC'), region=MODEL)
del mdb.models['standard'].historyOutputRequests['H-Output-1']
##
##  Apply encastre bc to left end
##
f = a.instances['Lug-1'].faces
faces = f.findAt(((-0.02, 0.006667, 0.013333), ))
region = regionToolset.Region(faces=faces)
mdb.models['standard'].EncastreBC(name='Fix left end',
    createStepName='LugLoad', region=region)

session.viewports['Viewport: 1'].setValues(displayedObject=a)
session.viewports['Viewport: 1'].view.fitView()
session.viewports['Viewport: 1'].view.setValues(session.views['Iso'])
##
##  Partition the lug
##
c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums

pickedCells = c.findAt(((-0.02, 0.006667, 0.013333), ))
p.PartitionCellByPlaneThreePoints(point1=v.findAt(coordinates=(0.095, 0.015,
    0.02)), cells=pickedCells, point2=p.InterestingPoint(edge=e.findAt(
    coordinates=(0.08, 0.03, 0.02)), rule=MIDDLE), point3=p.InterestingPoint(
    edge=e.findAt(coordinates=(0.08, 0.03, 0.0)), rule=MIDDLE))
c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums

##
##  Apply pressure load to bottom of hole
##
a.regenerate()
s = a.instances['Lug-1'].faces
side1Faces = s.findAt(((0.094968, 0.01402, 0.013333), ))
region = regionToolset.Region(side1Faces=side1Faces)
mdb.models['standard'].Pressure(name='Pressure load',
    createStepName='LugLoad', region=region, magnitude=5.0E7)


##
##  Create partitions
##
pickedCells = c.findAt(((-0.02, 0.006667, 0.006667), ), ((-0.02, 0.023333,
    0.013333), ))
p.PartitionCellByPlaneThreePoints(cells=pickedCells, point1=p.InterestingPoint(
    edge=e.findAt(coordinates=(0.069393, 0.004393, 0.0)), rule=MIDDLE),
    point2=p.InterestingPoint(edge=e.findAt(coordinates=(0.069393, 0.004393,
    0.02)), rule=MIDDLE), point3=p.InterestingPoint(edge=e.findAt(
    coordinates=(0.090607, 0.025607, 0.02)), rule=MIDDLE))

c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums

p.DatumPointByEdgeParam(edge=e.findAt(coordinates=(0.055, -0.01, 0.02)),
    parameter=0.25)
pickedCells = c.findAt(((-0.02, 0.006667, 0.006667), ), ((-0.02, 0.023333,
    0.013333), ))
p.PartitionCellByPlanePointNormal(point=d[5], normal=e.findAt(coordinates=(
    0.055, -0.01, 0.02)), cells=pickedCells)
c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums

##
##  Assign global seed
##
p.seedPart(size=0.007)
import re, uti
if re.search('Student', uti.getProductVersion()):
   p.seedPart(size=0.01)
##
##  Assign element type
##
elemType1 = mesh.ElemType(elemCode=C3D20R)
elemType2 = mesh.ElemType(elemCode=C3D15)
elemType3 = mesh.ElemType(elemCode=C3D10M)
cells = c
pickedRegions =(cells, )
p.setElementType(regions=pickedRegions, elemTypes=(elemType1, elemType2,
    elemType3))
##
##  Generate the mesh
##
p.generateMesh()
session.viewports['Viewport: 1'].view.setValues(session.views['Iso'])
session.viewports['Viewport: 1'].assemblyDisplay.geometryOptions.setValues(
    datumPoints=OFF)
##
##  Create job
##
a.regenerate()
mdb.Job(name='Lug', model='standard',
    description='Linear Elastic Steel Connecting Lug')
##
##  Save model database
##
mdb.saveAs('Lug.cae')
##
##  Explicit dynamics model
##
mdb.Model(name='explicit', objectToCopy=mdb.models['standard'])

##
##  add density
##
mdb.models['explicit'].materials['Steel'].Density(table=((7800.0, ), ))

##
##  replace static step with explicit dynamics step
##
a = mdb.models['explicit'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
mdb.models['explicit'].ExplicitDynamicsStep(name='LugLoad',
    previous='Initial', maintainAttributes=True, timePeriod=0.005)

##
##  change number of field output intervals to 125
##
mdb.models['explicit'].fieldOutputRequests['F-Output-1'].setValues(
    numIntervals=125)

##
##  change element type to linear and library to EXPLICIT
##
elemType1 = mesh.ElemType(elemCode=C3D8R, elemLibrary=EXPLICIT,
    hourglassControl=ENHANCED)
elemType2 = mesh.ElemType(elemCode=C3D6, elemLibrary=EXPLICIT)
elemType3 = mesh.ElemType(elemCode=C3D4, elemLibrary=EXPLICIT)
p = mdb.models['explicit'].parts['Lug']
c = p.cells
cells = c
pickedRegions =(cells, )
p.setElementType(regions=pickedRegions, elemTypes=(elemType1, elemType2,
    elemType3))

if re.search('Student', uti.getProductVersion()):
   p.seedPart(size=0.007)
   p.generateMesh()

##
##  create job
##
mdb.Job(name='expLug', model='explicit', type=ANALYSIS,
    description='dynamic analysis of lug')

a = mdb.models['standard'].rootAssembly
a.regenerate()
a = mdb.models['explicit'].rootAssembly
a.regenerate()

mdb.save()
```

---

## A.3 斜板 (Skew plate)

**脚本文件：** `gsi_skewplate_caemodel.py`

**说明：** 本脚本创建了一个线性弹性斜板模型承受20kPa均匀压力载荷。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for linear skew plate example
#

from abaqus import *
from abaqusConstants import *
session.viewports['Viewport: 1'].makeCurrent()
session.viewports['Viewport: 1'].maximize()
session.journalOptions.setValues(replayGeometry=COORDINATE,
    recoverGeometry=COORDINATE)
from caeModules import *
from driverUtils import executeOnCaeStartup
executeOnCaeStartup()
Mdb()

##
##  Sketch profile of the plate
##
s = mdb.models['Model-1'].ConstrainedSketch(name='__profile__', sheetSize=4.0)
g, v, d, c = s.geometry, s.vertices, s.dimensions, s.constraints
s.setPrimaryObject(option=STANDALONE)
s.rectangle(point1=(-0.275, 0.25), point2=(0.575, -0.25))
s.delete(objectList=(c[18], c[19], c[20], c[21], c[22]))
s.VerticalConstraint(entity=g.findAt((-0.275, 0.0)))
s.VerticalConstraint(entity=g.findAt((0.575, 0.0)))
s.ParallelConstraint(entity1=g.findAt((0.15, -0.25)), entity2=g.findAt((0.15,
    0.25)))
s.ObliqueDimension(vertex1=v.findAt((-0.275, 0.25)), vertex2=v.findAt((-0.275,
    -0.25)), textPoint=(-0.384168207645416, -0.039074968546629), value=0.4)
s.HorizontalDimension(vertex1=v.findAt((-0.275, -0.25)), vertex2=v.findAt((
    0.575, -0.25)), textPoint=(0.502545475959778, -0.405263155698776),
    value=1.0)
s.AngularDimension(line1=g.findAt((-0.275, -0.05)), line2=g.findAt((0.225,
    -0.25)), textPoint=(-0.221120104193687, -0.173046261072159), value=60.0)
session.viewports['Viewport: 1'].view.fitView()
s.move(vector=(-0.725, 0.05), objectList=(g.findAt((-0.275, -0.05)), g.findAt((
    0.225, 0.038675)), g.findAt((0.725, 0.52735)), g.findAt((0.225,
    0.438675))))
p = mdb.models['Model-1'].Part(name='Plate', dimensionality=THREE_D,
    type=DEFORMABLE_BODY)
p = mdb.models['Model-1'].parts['Plate']
p.BaseShell(sketch=s)
s.unsetPrimaryObject()
p = mdb.models['Model-1'].parts['Plate']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
del mdb.models['Model-1'].sketches['__profile__']
##
##  Create material 'Metal'
##
mdb.models['Model-1'].Material('Metal')
mdb.models['Model-1'].materials['Metal'].Elastic(table=((30.0E9, 0.3), ))
##
##  Create shell section
##
mdb.models['Model-1'].HomogeneousShellSection(name='PlateSection',
    preIntegrate=ON,
    material='Metal', thickness=0.008,
    poissonDefinition=DEFAULT, temperature=GRADIENT)
##
##  Create datum coordinate system
##
p1 = mdb.models['Model-1'].parts['Plate']
e = p1.edges
p1.DatumCsysByTwoLines(CARTESIAN, line1=e.findAt((-0.75,
    -0.0556624327025937, 0.0), ), line2=e.findAt((0.0,
    0.477350269189625, 0.0), ))
##
##  Assign material orientation to the plate
##
p0 = mdb.models['Model-1'].parts['Plate']
f = p0.faces
faces = f[0:1]
region=(None, None,
    f.findAt(((-0.666666666666667,
    0.125783423063208, 0.0), (0.0, 0.0, 1.0)), ), None)
datum = p0.datums[2]
p0.MaterialOrientation(region=region, localCsys=datum, axis=AXIS_3)
##
##  Assign section to the plate
##
p0 = mdb.models['Model-1'].parts['Plate']
f = p0.faces
faces = f[0:1]
region=(None, None,
    f.findAt(((-0.666666666666667,
    0.125783423063208, 0.0), (0.0, 0.0, 1.0)), ), None)
p0 = mdb.models['Model-1'].parts['Plate']
p0.SectionAssignment(region=region, sectionName='PlateSection')

a = mdb.models['Model-1'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
##
##  Set coordinate system (done by default)
##
a = mdb.models['Model-1'].rootAssembly
a.DatumCsysByDefault(CARTESIAN)
##
##  Instance the plate
##
p = mdb.models['Model-1'].parts['Plate']
a.Instance(name='Plate-1', part=p, dependent=ON)
##
##  Partition the plate
##
p = mdb.models['Model-1'].parts['Plate']
c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums

faces=(f.findAt((
    -0.666666666666667, 0.125783423063208, 0.0), (0.0, 0.0, 1.0)), )
p.PartitionFaceByShortestPath(faces=faces,
    point1=p.InterestingPoint(e.findAt((-0.75,
    -0.0556624327025937, 0.0), ), MIDDLE),
    point2=p.InterestingPoint(e.findAt((-0.25,
    0.63301270189222, 0.0), ), MIDDLE))

c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums

##
##  Create geometry set 'MidSpan'
##
a = mdb.models['Model-1'].rootAssembly
e1 = a.instances['Plate-1'].edges
a.Set(edges=e1.findAt((
    (-0.5, 0.188675134594813, 0.0), ), ), name='MidSpan')
##
##  Create geometry set 'EndA'
##
a = mdb.models['Model-1'].rootAssembly
e1 = a.instances['Plate-1'].edges
a.Set(edges=e1.findAt((
    (-1.0, 0.1, 0.0), ), ), name='EndA')
##
##  Create geometry set 'EndB'
##
a = mdb.models['Model-1'].rootAssembly
e1 = a.instances['Plate-1'].edges
a.Set(edges=e1.findAt((
    (0.0, 0.477350269189625, 0.0), ), ), name='EndB')

##
##  Create a static general step
##
mdb.models['Model-1'].StaticStep(name='Apply pressure',
    previous='Initial', description='Uniform pressure(20 kPa) load',
    timePeriod=1, adiabatic=OFF, maxNumInc=100,
    stabilization=None, timeIncrementationMethod=AUTOMATIC, initialInc=1,
    minInc=1e-05, maxInc=1, matrixSolver=SOLVER_DEFAULT, amplitude=RAMP,
    extrapolation=LINEAR, fullyPlastic="")
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    step='Apply pressure')
##
##  Modify output requests
##
mdb.models['Model-1'].fieldOutputRequests['F-Output-1'].setValues(
    variables=('S', 'E', 'U', 'RF'))
a0=mdb.models['Model-1'].rootAssembly
regionDef=a0.sets['MidSpan']
mdb.models['Model-1'].historyOutputRequests['H-Output-1'].setValues(
    variables=('U3',), region=regionDef)

session.viewports['Viewport: 1'].assemblyDisplay.setValues(loads=ON, bcs=ON,
    predefinedFields=ON)
##
##  Apply bc in local CSYS to set EndB (right edge)
##
a0 = mdb.models['Model-1'].rootAssembly
region = a0.sets['EndB']
datum = mdb.models['Model-1'].rootAssembly.instances['Plate-1'].datums[2]
mdb.models['Model-1'].DisplacementBC(name='Rail boundary condition',
    createStepName='Apply pressure', region=region, u2=0.0, u3=0.0, ur1=0.0,
    ur2=0.0, ur3=0.0, localCsys=datum)
##
##  Apply encastre bc to set EndA (left edge)
##
a0 = mdb.models['Model-1'].rootAssembly
region = a0.sets['EndA']
mdb.models['Model-1'].EncastreBC(name='Fix left end',
    createStepName='Apply pressure', region=region)
##
##  Apply pressure load
##
a0 = mdb.models['Model-1'].rootAssembly
f1 = a0.instances['Plate-1'].faces
region=((
    f1.findAt(((
    -0.666666666666667, 0.259116756396542, 0.0), (0.0, 0.0, 1.0)), ((
    -0.333333333333333, 0.318233512793084, 0.0), (0.0, 0.0, 1.0)), ), SIDE1),
    )
mdb.models['Model-1'].Pressure(name='Pressure',
    createStepName='Apply pressure', region=region, magnitude=2.0E4)

session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=ON, loads=OFF,
    bcs=OFF, predefinedFields=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.meshOptions.setValues(
    meshTechnique=ON)
##
##  Assign global seed
##
p.seedPart(size=0.1)
##
##  Use structured meshing
##
f1 = p.faces
regions=(
    f1.findAt((
    -0.666666666666667, 0.259116756396542, 0.0), (0.0, 0.0, 1.0)),
    f1.findAt((
    -0.333333333333333, 0.318233512793084, 0.0), (0.0, 0.0, 1.0)))
p.setMeshControls(regions=regions, technique=STRUCTURED)
##
##  Assign element type
##
elemType1 = mesh.ElemType(elemCode=S8R5)
elemType2 = mesh.ElemType(elemCode=STRI65)
regions=(None, None,
    f1.findAt(((
    -0.666666666666667, 0.259116756396542, 0.0), (0.0, 0.0, 1.0)), ((
    -0.333333333333333, 0.318233512793084, 0.0), (0.0, 0.0, 1.0)), ), None)
p.setElementType(regions=regions, elemTypes=(elemType1, elemType2))
##
##  Generate mesh
##
p.generateMesh()

session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.meshOptions.setValues(
    meshTechnique=OFF)
##
##  Create job
##
mdb.Job(name='SkewPlate', model='Model-1',
    description='Linear Elastic Skew Plate. 20 kPa Load.')

a = mdb.models['Model-1'].rootAssembly
a.regenerate()

##
##  Save model database
##
mdb.saveAs('SkewPlate.cae')
```

---

## A.4 货运起重机 (Cargo crane)

**脚本文件：** `gsi_crane_caemodel.py`

**说明：** 本脚本创建了一个轻载货运起重机的三维模型，包含主梁、支撑和横撑结构。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for static crane example
#


def GetBlockPosition(modelName, blockPrefix):
    if blockPrefix == '':
        return len(mdb.models[modelName].keywordBlock.sieBlocks)-1
    pos = 0
    for block in mdb.models[modelName].keywordBlock.sieBlocks:
        if block[0:len(blockPrefix)].lower()==blockPrefix.lower():
            return pos
        pos=pos+1
    return -1

from abaqus import *
from abaqusConstants import *
session.viewports['Viewport: 1'].makeCurrent()
session.viewports['Viewport: 1'].maximize()
from caeModules import *
from driverUtils import executeOnCaeStartup
executeOnCaeStartup()
Mdb()

session.viewports['Viewport: 1'].setValues(displayedObject=None)
##
##  Sketch profile of truss
##
p = mdb.models['Model-1'].Part(name='Truss', dimensionality=THREE_D,
    type=DEFORMABLE_BODY)
p.ReferencePoint(point=(0.0, 0.0, 0.0))

p = mdb.models['Model-1'].parts['Truss']
session.viewports['Viewport: 1'].setValues(displayedObject=p)

d, r = p.datums, p.referencePoints
p.DatumPointByOffset(point=r[1], vector=(0.0, 1.0, 0.0))
p.DatumPointByOffset(point=r[1], vector=(8.0, 1.5, 0.9))
p.DatumPlaneByThreePoints(point1=r[1], point2=d[3], point3=d[2])
p.DatumAxisByPrincipalAxis(principalAxis=YAXIS)

session.viewports['Viewport: 1'].view.fitView()

# ... (完整代码见源文件)
```

---

## A.5 货运起重机——动态加载 (Cargo crane – dynamic loading)

**脚本文件：** `gsi_dyncrane_caemodel.py`

**说明：** 本脚本创建了货运起重机的动态分析模型，包含频率提取和瞬态模态动力学分析。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for dynamic crane example
#


def GetBlockPosition(modelName, blockPrefix):
    if blockPrefix == '':
        return len(mdb.models[modelName].keywordBlock.sieBlocks)-1
    pos = 0
    for block in mdb.models[modelName].keywordBlock.sieBlocks:
        if block[0:len(blockPrefix)].lower()==blockPrefix.lower():
            return pos
        pos=pos+1
    return -1

from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

---

## A.6 非线性斜板 (Nonlinear skew plate)

**脚本文件：** `gsi_nlskewplate_caemodel.py`

**说明：** 本脚本创建了非线性斜板分析模型，开启了几何非线性选项。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for nonlinear skew plate example
#

from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
# 关键区别：StaticStep中设置nlgeom=ON开启几何非线性
```

---

## A.7 应力波在杆中的传播 (Stress wave propagation in a bar)

**脚本文件：** `gxi_stresswave_caemodel.py`

**说明：** 本脚本创建了应力波在杆中传播的显式动力学分析模型。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Replay file for stress wave in a bar example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

---

## A.8 带塑性的连接吊环 (Connecting lug with plasticity)

**脚本文件：** `gsi_plasticlug_caemodel.py`

**说明：** 本脚本创建了弹塑性钢制连接吊环模型，材料包含塑性属性。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for plastic lug example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
# 材料定义包含Plastic属性：
# mdb.models['Model-1'].materials['Steel'].Plastic(table=((380.0E6, 0.0), (580.0E6, 0.35)))
```

---

## A.9 加筋板上的爆炸载荷 (Blast loading on a stiffened plate)

**脚本文件：** `gxi_stiffplate_caemodel.py`

**说明：** 本脚本创建了带加强筋平板在爆炸载荷作用下的显式动力学分析模型。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for stiffened plate example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

---

## A.10 轴对称支架 (Axisymmetric mount)

**脚本文件：** `gsi_mount_caemodel.py`

**说明：** 本脚本创建了橡胶轴对称支架的超弹性分析模型。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for rubber mount example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
# 材料使用Hyperelastic超弹性模型
```

---

## A.11 管道系统振动 (Vibration of a piping system)

**脚本文件：** `gsi_pipe_caemodel.py`

**说明：** 本脚本创建了管道系统的振动分析模型，包含静态加载和频率提取分析。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for pipe example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

---

## A.12 型材成形 (Forming a channel)

**脚本文件：** `gsi_channel_caemodel.py` 和 `gsi_channel_caemodel_spring.py`

**说明：** 本脚本创建了通道零件的成形分析模型，包含静态分析和显式动力学分析，以及回弹分析。

```python
#
# Getting Started with Abaqus
#
# Script for forming portion channel example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

**回弹分析脚本：** `gsi_channel_caemodel_spring.py`

```python
#
# Getting Started with Abaqus
#
# Script for springback portion of channel example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

---

## A.13 搭接接头剪切 (Shearing of a lap joint)

**脚本文件：** `gsi_lap_joint_caemodel.py`

**说明：** 本脚本创建了搭接接头的剪切分析模型，包含铝合金板和钛合金铆钉。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Lap joint example
#
from abaqus import *
from abaqusConstants import *
# ... (完整代码见源文件)
```

**铝合金材料数据文件：** `lap_joint_alum.txt`

```csv
0.0000, 0.000000000
350.00, 0.004881450
368.71, 0.006142399
376.50, 0.007251046
391.98, 0.010466946
403.15, 0.013622734
412.36, 0.016751185
422.87, 0.020897768
444.17, 0.031194840
461.50, 0.041436541
507.90, 0.077083682
581.50, 0.158110181
649.17, 0.259053975
704.22, 0.359821757
728.78, 0.410164296
751.85, 0.460486053
773.68, 0.510790516
794.44, 0.561080056
814.28, 0.611356764
```

**钛合金材料数据文件：** `lap_joint_titanium.txt`

```csv
0.0000, 0.000000000
907.00, 0.008098214
934.86, 0.009346964
944.28, 0.010431071
961.77, 0.013587232
973.73, 0.016694018
983.28, 0.019779286
993.89, 0.023874018
1014.7, 0.034059821
1023.3, 0.039136607
1051.1, 0.059384821
1099.8, 0.109819643
1129.0, 0.150080357
1164.9, 0.210400893
1190.2, 0.260626786
1212.8, 0.310828571
```

---

## A.14 电路板跌落试验 (Circuit board drop test)

**脚本文件：** `gxi_circuit_caemodel.py`

**说明：** 本脚本创建了电路板的跌落试验显式动力学分析模型。

```python
#
# Getting Started with Abaqus: Interactive Edition
#
# Script for circuit board drop test example
#
from abaqus import *
from abaqusConstants import *
backwardCompatibility.setValues(includeDeprecated=True, reportDeprecated=False)

session.viewports['Viewport: 1'].makeCurrent()
session.viewports['Viewport: 1'].maximize()
# ... (完整代码见源文件)
```

---

## 脚本运行说明

1. 在ABAQUS/CAE中打开上述脚本文件（.py格式）
2. 运行脚本将自动创建相应的模型数据库（.cae文件）
3. 可以修改脚本中的参数来自定义模型
4. 部分脚本包含学生版检查，会自动调整网格密度

## 关键材料参数汇总

| 示例 | 材料 | 弹性模量 (Pa) | 泊松比 | 密度 (kg/m³) |
|------|------|---------------|--------|--------------|
| A.1 悬挂框架 | 钢 | 200E9 | 0.3 | 7800 |
| A.2 连接吊环 | 钢 | 200E9 | 0.3 | 7800 |
| A.3 斜板 | 金属 | 30E9 | 0.3 | - |
| A.9 加筋板 | 钢 | 210E9 | 0.3 | 7800 |
| A.10 轴对称支架 | 橡胶 | 超弹性 | - | - |
| A.13 搭接接头 | 铝合金/钛合金 | 见数据文件 | 见数据文件 | 见数据文件 |
| A.14 电路板 | PCB/泡沫 | 45E9/3E6 | 0.3/0.0 | 500/100 |

---

*本文档由ABAQUS Getting Started with Abaqus: Interactive Edition (6.14) 自动翻译生成*
## ##  dummy part
## p = mdb.models['standard'].Part(name='Truss-all',
## ##  create cross brace part in the assembly module
## a = mdb.models['standard'].rootAssembly
## Set coordinate system (done by default)
## ##  Create beam profiles and beam sections
## mdb.models['standard'].BoxProfile(name='MainBoxProfile', b=0.05,
## ##  Flip tangent directions
## ##p = mdb.models['standard'].parts['Truss']
#### ##edges = e.findAt(((4.5, 0.84375, 0.50625), ), ((2.5, 0.46875, 0.28125), ), ((
## 0.5, 0.09375, 0.05625), ), ((4.5, 0.84375, 1.49375), ), ((2.5, 0.46875,
## 1.71875), ), ((0.5, 0.09375, 1.94375), ))
## ##  Assign beam sections to the cross brace
## p = mdb.models['standard'].parts['Cross brace']
## ##  Assign beam sections to the internal bracing
## p = mdb.models['standard'].parts['Truss']
## ##  Assign beam sections to the main members
## p = mdb.models['standard'].parts['Truss']
## ##  Assign beam section orientations to truss 'B'
## p = mdb.models['standard'].parts['Truss']
## ##  Assign beam section orientations to truss 'A'
## p = mdb.models['standard'].parts['Truss']
## ##  Assign beam section orientations to 'Cross brace'
## p = mdb.models['standard'].parts['Cross brace']
## ##
## ##  Translate the truss
## p = a.instances['Truss-1']
## ##  Translate the cross brace
## p = a.instances['Cross brace-1']
## ##  Create geometry sets
## session.viewports['Viewport: 1'].assemblyDisplay.setValues(
## ##  Create a frequency extraction step
## mdb.models['standard'].FrequencyStep(name='Extract frequencies',
## ##  Create a modal dynamics step
## mdb.models['standard'].ModalDynamicsStep(name='Transient modal dynamics',
## ##  Modify output requests
## mdb.models['standard'].fieldOutputRequests['F-Output-2'].setValues(
## ##  Create constraints between the tips of the truss
## session.viewports['Viewport: 1'].assemblyDisplay.setValues(interactions=ON)
## ##  Create JOIN connectors between truss and bracing
## v1 = a.instances['Cross brace-1'].vertices
## ##  Apply encastre bc to set 'Attach'
## session.viewports['Viewport: 1'].assemblyDisplay.setValues(
## ##  Create amplitude curve 'Bounce'
## session.viewports['Viewport: 1'].assemblyDisplay.setValues(
## ##  Apply concentrated force to set 'Tip-b'
## a = mdb.models['standard'].rootAssembly
## ##  Assign global seed
## p = mdb.models['standard'].parts['Truss']
## ##  Assign element type
## elemType1 = mesh.ElemType(elemCode=B33)
## ##  Generate mesh
## p = mdb.models['standard'].parts['Truss']
## ##  Add keywords
## mdb.models['standard'].keywordBlock.synchVersions()
## ##  Create job
## mdb.Job(name='DynCrane', model='standard',
## ##  Save model database
## mdb.saveAs('DynCrane.cae')
## ##  delete modal dynamics step
## del mdb.models['explicit'].steps['Transient modal dynamics']
## ##  replace frequency extraction step with explicit dynamics step
## mdb.models['explicit'].ExplicitDynamicsStep(name='Extract frequencies',
## ##  rename explicit dynamics step
## mdb.models['explicit'].steps.changeKey(fromName='Extract frequencies',
## ##  Redefine history output
## regionDef=mdb.models['explicit'].rootAssembly.sets['Tip-a']
## ##  Add mass proportional damping
## mdb.models['explicit'].sections['BracingSection'].setValues(poissonRatio=0.0,
## ##  Redefine tip load
## a = mdb.models['explicit'].rootAssembly
## ##  Change element library
## elemType1 = mesh.ElemType(elemCode=B31, elemLibrary=EXPLICIT)
## ##  Create explicit job
## mdb.Job(name='expDynCrane', model='explicit', type=ANALYSIS)
### A.6 Nonlinear skew plate
# # Getting Started with Abaqus: Interactive Edition
# # Script for nonlinear skew plate example
# from abaqus import *
## ##  Sketch profile of the plate
## s = mdb.models['Model-1'].ConstrainedSketch(name='__profile__', sheetSize=4.0)
## ##  Create material 'Metal'
## mdb.models['Model-1'].Material('Metal')
## ##  Create shell section
## mdb.models['Model-1'].HomogeneousShellSection(name='PlateSection',
## ##  Create datum coordinate system
## p1 = mdb.models['Model-1'].parts['Plate']
## ##  Assign material orientation to the plate
## p0 = mdb.models['Model-1'].parts['Plate']
## ##  Assign section to the plate
## p0 = mdb.models['Model-1'].parts['Plate']
## ##  Set coordinate system (done by default)
## a = mdb.models['Model-1'].rootAssembly
## ##  Instance the plate
## p = mdb.models['Model-1'].parts['Plate']
## ##  Partition the plate
## p = mdb.models['Model-1'].parts['Plate']
## ##  Create geometry set 'MidSpan'
## a = mdb.models['Model-1'].rootAssembly
## ##  Create geometry set 'EndA'
## a = mdb.models['Model-1'].rootAssembly
## ##  Create geometry set 'EndB'
## a = mdb.models['Model-1'].rootAssembly
## ##  Create a static general step
## mdb.models['Model-1'].StaticStep(name='Apply pressure',
## ##  Modify output requests
## mdb.models['Model-1'].fieldOutputRequests['F-Output-1'].setValues(
## ##  Apply bc in local CSYS to set EndB (right edge)
## a0 = mdb.models['Model-1'].rootAssembly
## ##  Apply encastre bc to set EndA (left edge)
## a0 = mdb.models['Model-1'].rootAssembly
## ##  Apply pressure load
## a0 = mdb.models['Model-1'].rootAssembly
## ##  Assign global seed
## p.seedPart(size=0.1)
## ##  Use structured meshing
## f1 = p.faces
## ##  Assign element type
## elemType1 = mesh.ElemType(elemCode=S8R5)
## ##  Generate mesh
## p.generateMesh()
## ##  Create job
## mdb.Job(name='NlSkewPlate', model='Model-1',
## ##  Save model database
## mdb.saveAs('NlSkewPlate.cae')
### A.7 Stress wave propagation in a bar
# # Getting Started with Abaqus: Interactive Edition
# # Replay file for stress wave in a bar example
# from abaqus import *
### A.8 Connecting lug with plasticity
# # Getting Started with Abaqus: Interactive Edition
# # Script for plastic lug example
# from abaqus import *
## Sketch profile of the lug
## ##  Create material 'Steel'
## mdb.models['Model-1'].Material('Steel')
## ##  Create solid section
## mdb.models['Model-1'].HomogeneousSolidSection(name='LugSection',
## ##  Assign solid section
## c = p.cells
## ##  Set coordinate system (done by default)
## a = mdb.models['Model-1'].rootAssembly
## ##  Instance the lug
## a.Instance(name='Lug-1', part=p, dependent=ON)
## ##  Create a static general step
## mdb.models['Model-1'].StaticStep(name='LugLoad',
## ##  Apply encastre bc to left end
## f = a.instances['Lug-1'].faces
## ##  Partition the lug
## c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums
## ##  Apply pressure load to bottom of hole
## a.regenerate()
## ##  Create partitions
## pickedCells = c.findAt(((-0.02, 0.006667, 0.006667), ), ((-0.02, 0.023333,
## ##  Assign global seed
## p.seedPart(size=0.007)
## ##  Assign element type
## elemType1 = mesh.ElemType(elemCode=C3D20R)
## ##  Generate the mesh
## p.generateMesh()
# #  Save model database
# mdb.saveAs('PlasticLug.cae')
### A.9 Blast loading on a stiffened plate
# # Getting Started with Abaqus: Interactive Edition
# # Script for stiffened plate example
# from abaqus import *
### A.10 Axisymmetric mount
# # Getting Started with Abaqus: Interactive Edition
# # Script for rubber mount example
# from abaqus import *
## ##  Sketch profile of the mount
## s = mdb.models['Model-1'].ConstrainedSketch(name='__profile__', sheetSize=0.3)
## ##  Create material 'Rubber'
## mdb.models['Model-1'].Material('Rubber')
## ##  Create material 'Steel'
## mdb.models['Model-1'].Material('Steel')
## ##  Create solid sections for the rubber and steel
## mdb.models['Model-1'].HomogeneousSolidSection(name='RubberSection',
## ##  Partition the part into two regions (rubber and steel regions)
## c, f, e, v, d  = p.cells, p.faces, p.edges, p.vertices, p.datums
## ##  Assign rubber section
## p = mdb.models['Model-1'].parts['Mount']
## ##  Assign steel section
## faces = f.findAt(((0.043333, 0.003333, 0.0), ))
## ##  Set coordinate system (done by default)
## a.DatumCsysByDefault(CARTESIAN)
## ##  Instance the mount
## p = mdb.models['Model-1'].parts['Mount']
## ##  Create geometry set 'Middle'
## e = a.instances['Mount-1'].edges
## ##  Create geometry set 'Out'
## v = a.instances['Mount-1'].vertices
## ##  Create surface 'Bottom'
## s = a.instances['Mount-1'].edges
## ##  Create a static general step
## mdb.models['Model-1'].StaticStep(name='Compress mount', previous='Initial',
## ##  Modify output requests
## mdb.models['Model-1'].fieldOutputRequests['F-Output-1'].setValues(
## ##  Apply pressure load
## region = a.surfaces['Bottom']
## ##  Apply symmetry bc to set "Middle'
## region = a.sets['Middle']
## ##  Suppress visibility of datum geometry
## session.viewports['Viewport: 1'].assemblyDisplay.geometryOptions.setValues(
## ##  Assign edge seeds
## p = mdb.models['Model-1'].parts['Mount']
## ##  Use structured meshing
## f = p.faces
## ##  Assign element type to the rubber
## elemType1 = mesh.ElemType(elemCode=CAX4H, elemLibrary=STANDARD)
## ##  Assign element type to the steel
## elemType1 = mesh.ElemType(elemCode=CAX4I, elemLibrary=STANDARD)
## ##  Generate mesh
## p.generateMesh()
## ##  Create job
## mdb.Job(name='Mount', model='Model-1',
## ##  Save model database
## mdb.saveAs('Mount')
### A.11 Vibration of a piping system
# # Getting Started with Abaqus: Interactive Edition
# # Script for pipe example
# #
## ##  Rename the model 'Original'
## session.viewports['Viewport: 1'].setValues(displayedObject=None)
## ##  Sketch profile of the pipe
## s = mdb.models['Original'].ConstrainedSketch(name='__profile__',
## ##  Create material 'Steel'
## mdb.models['Original'].Material('Steel')
## ##  Create pipe profile and section
## mdb.models['Original'].PipeProfile(name='PipeProfile', r=0.09, t=0.02)
## ##  Assign pipe section
## e = p.edges
## ##  Assign beam orientations
## region=(None, e.findAt(((1.25, 0.0, 0.0), ), ), None, None)
## ##  Set coordinate system (done by default)
## a.DatumCsysByDefault(CARTESIAN)
## ##  Instance the pipe
## p = mdb.models['Original'].parts['Pipe']
## ##  Create geometry set 'Left'
## v = a.instances['Pipe-1'].vertices
## ##  Create geometry set 'Right'
## a.Set(vertices=v.findAt(((5.0, 0.0, 0.0), ), ), name='Right')
## ##  Create a static general step
## mdb.models['Original'].StaticStep(name='Pull I', previous='Initial',
## ##  Create a frequency extraction step
## mdb.models['Original'].FrequencyStep(name='Frequency I', previous='Pull I',
## ##  Modify output requests
## mdb.models['Original'].fieldOutputRequests['F-Output-1'].setValues(
## ##  Apply encastre bc to left end
## region = a.sets['Left']
## ##  Fix all dofs at right end except for U1
## region = a.sets['Right']
## ##  Apply concentrated force to right end
## region = a.sets['Right']
## ##  Assign edge seed
## p = mdb.models['Original'].parts['Pipe']
## ##  Assign element type
## elemType1 = mesh.ElemType(elemCode=PIPE32)
## ##  Generate mesh
## p.generateMesh()
## ##  Create job
## mdb.Job(name='Pipe', model='Original',
## ##  Save model database
## mdb.saveAs('Pipe')
## ##  Copy model to 'Restart'
## mdb.Model('Restart', mdb.models['Original'])
## ##  Edit restart model attributes
## mdb.models['Restart'].setValues(restartJob='Pipe', restartStep='Frequency I',
## ##  Create general static step; insert after previous frequency step
## mdb.models['Restart'].StaticStep(name='Pull II', previous='Frequency I',
## ##  Create frequency extraction step
## mdb.models['Restart'].FrequencyStep(name='Frequency II', previous='Pull II',
## ##  Modify output requests
## mdb.models['Restart'].steps['Pull II'].Restart(frequency=10, overlay=OFF)
## ##  Double the magnitude of the applied force
## in the second general step
## mdb.models['Restart'].loads['Force'].setValuesInStep(stepName='Pull II',
## ##  Create a restart analysis job
## mdb.Job(name='PipeRestart', model='Restart', type=RESTART,
# a = mdb.models['Original'].rootAssembly
## ##  Save model database
## mdb.saveAs('Pipe')
### A.12 Forming a channel
# # Getting Started with Abaqus
# # Script for forming portion channel example
# from abaqus import *
## ##  Sketch profile of blank
## s = mdb.models['standard'].ConstrainedSketch(name='__profile__',
## ##  Sketch profile of punch
## s0 = mdb.models['standard'].ConstrainedSketch(name='__profile__', sheetSize=0.25)
# #   Create holder
# s = mdb.models['standard'].ConstrainedSketch(name='__profile__',
# #   Create die
# s = mdb.models['standard'].ConstrainedSketch(name='__profile__',
## ##  Add reference point to die
## p = mdb.models['standard'].parts['Die']
## ##  Add reference point to holder
## p = mdb.models['standard'].parts['Holder']
## ##  Add reference point to punch
## p = mdb.models['standard'].parts['Punch']
## ##  Create material 'Steel'
## mdb.models['standard'].Material('Steel')
## ##  Create and assign solid section to blank
## mdb.models['standard'].HomogeneousSolidSection(name='BlankSection',
## ##  Define datum coordinate system
## p = mdb.models['standard'].parts['Blank']
## ##  Assign material orientation to blank
## p = mdb.models['standard'].parts['Blank']
## ##  Set coordinate system (done by default)
## a = mdb.models['standard'].rootAssembly
## ##  Instance the blank
## p = mdb.models['standard'].parts['Blank']
## ##  Instance the punch
## p = mdb.models['standard'].parts['Punch']
## ##  Translate the punch
## a = mdb.models['standard'].rootAssembly
## ##   Edge to edge constraints between punch and blank
## e11 = a.instances['Punch-1'].edges
## ##  Instance the holder
## p = mdb.models['standard'].parts['Holder']
## ##   Edge to edge constraints between holder and punch
## e11 = a.instances['Holder-1'].edges
## ##  Instance the die
## p = mdb.models['standard'].parts['Die']
## ##   Edge to edge constraints between die and blank (horizontal)
## e11 = a.instances['Die-1'].edges
# #   Create geometry set RefPunch
# a = mdb.models['standard'].rootAssembly
# #   Create geometry set RefHolder
# a = mdb.models['standard'].rootAssembly
# #   Create geometry set RefDie
# a = mdb.models['standard'].rootAssembly
# #   Reset view
# session.viewports['Viewport: 1'].view.setValues(width=0.0066561,
# #   Create geometry set Center
# a = mdb.models['standard'].rootAssembly
# #   Create surface BlankTop
# a = mdb.models['standard'].rootAssembly
# #   Create surface BlankBot
# a = mdb.models['standard'].rootAssembly
# #   Create surface PunchSurf
# s = a.instances['Punch-1'].edges
# #   Create surface HolderSurf
# s = a.instances['Holder-1'].edges
# #   Create surface DieSurf
# s = a.instances['Die-1'].edges
## ##  Create two static general steps
## mdb.models['standard'].StaticStep(name='Holder force',
## ##  Modify output requests
## mdb.models['standard'].fieldOutputRequests['F-Output-1'].setValues(
## ##  Create degree of freedom monitor
## mdb.models['standard'].steps['Holder force'].Monitor(dof=2,
## ##  Print diagnostic data for contact
## mdb.models['standard'].steps['Holder force'].DiagnosticPrint(frequency=1,
## ##  Reset view
## session.viewports['Viewport: 1'].view.setValues(width=0.025757,
## ##  Create contact property 'Fric'
## mdb.models['standard'].ContactProperty('Fric')
## ##  Create contact property 'NoFric'
## mdb.models['standard'].ContactProperty('NoFric')
## ##  Create contact interaction 'Punch-Blank'
## region1=a.surfaces['PunchSurf']
## ##  Create contact interaction 'Holder-Blank'
## region1=a.surfaces['HolderSurf']
## ##  Create contact interaction 'Die-Blank'
## region1=a.surfaces['DieSurf']
## ##
## ##  Create BCs in step "Establish contact"
## region = a.sets['Center']
## ##  Add holder force
## region = a.sets['RefHolder']
## ##  Push punch down in step  "Move punch"
## session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Move punch')
## ##  Assign edge seeds
## p = mdb.models['standard'].parts['Blank']
## ##  Assign element type
## elemType1 = mesh.ElemType(elemCode=CPE4R, elemLibrary=STANDARD,
## ##  Use structured meshing
## f = p.faces
## ##  Generate mesh
## p.generateMesh()
## ##  Create job
## mdb.Job(name='Channel', model='standard',
## ##  Save model database
## mdb.saveAs('Channel')
## ##
## Create explicit dynamics model
## mdb.Model(name='explicit', objectToCopy=mdb.models['standard'])
## ##  add density
## mdb.models['explicit'].materials['Steel'].Density(table=((7800.0, ), ))
## ##  add point mass to holder
## r = p.referencePoints
## ##  delete all but first step
## del mdb.models['explicit'].steps['Move punch']
## ##  define set containing blank
## f1 = a.instances['Blank-1'].faces
## ##  replace the remaining static step with an explicit dynamics step
## mdb.models['explicit'].ExplicitDynamicsStep(name='Holder force',
## ##  create a second explicit dynamics step
## mdb.models['explicit'].ExplicitDynamicsStep(name='Move punch',
## ##  define mass scaling
## regionDef=mdb.models['explicit'].rootAssembly.sets['blank']
## ##  request RF2, U2 history output for punch reference point
## regionDef=mdb.models['explicit'].rootAssembly.sets['RefPunch']
## ##  define smooth step amplitude curves
## mdb.models['explicit'].SmoothStepAmplitude(name='smooth1', timeSpan=STEP,
## ##  use smooth step amplitude for holder force
## mdb.models['explicit'].loads['RefHolderForce'].setValues(amplitude='smooth1')
## ##  use smooth step amplitude for punch bc
## mdb.models['explicit'].boundaryConditions['RefPunchBC'].setValuesInStep(
## ##  create job
## mdb.Job(name='expChannel', model='explicit',
# # Getting Started with Abaqus
# # Script for springback portion of channel example
# from abaqus import *
## ##  Springback analysis model
## mdb.Model(name='import', objectToCopy=mdb.models['explicit'])
### A.13 Shearing of a lap joint
# # Getting Started with Abaqus: Interactive Edition
# # Lap joint example
# from abaqus import *
### A.14 Circuit board drop test
# # Getting Started with Abaqus: Interactive Edition
# # Script for circuit board drop test example
# from abaqus import *
## p = mdb.models['circuitBoard'].parts['Floor']
## p = mdb.models['circuitBoard'].parts['Packaging']
## session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=OFF)
