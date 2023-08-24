(select alldata.county,alldata.periodid,data_group,data_subgroup,avg(value) as value from 
(
(SELECT  dhis_data.total as value, 
vsp_data.county,
dhis_data.periodid,
vsp_data.indicator_on_khis, 
vsp_data.category,
khis_uid,
data_group,
 data_subgroup,
indicator,
definition,
data_source
FROM public.dhis_data
join vsp_data on split_part(dhis_data.organisationunitname, ' ', 1)  = vsp_data.county and dhis_data.dataid = vsp_data.khis_uid 
 and EXTRACT(YEAR FROM to_date(dhis_data.periodid::text, 'YYYYMMDD')) = EXTRACT(YEAR FROM vsp_data.period)
)

UNION ALL
(
select
values as value, 
vsp_data.county,
dhisperiods.periodid,
vsp_data.indicator_on_khis, 
vsp_data.category,
khis_uid,data_group,
data_subgroup,
indicator,
definition,
data_source
from vsp_data
join (select distinct periodid, split_part(dhis_data.organisationunitname, ' ', 1) as county from dhis_data ) as dhisperiods on vsp_data.county = dhisperiods.county and  EXTRACT(YEAR FROM vsp_data.period) = EXTRACT(YEAR FROM to_date(dhisperiods.periodid::text, 'YYYYMMDD'))
and vsp_data.khis_uid isnull and vsp_data.data_subgroup not in ('Service Coverage Index','Access Index','Quality Index')
)
) as alldata where alldata.data_group in ('Coverage','Acess','Context','Quality')
group by alldata.county,alldata.periodid,data_group,data_subgroup
)

UNION ALL


(select
vsp_data.county,
dhisperiods.periodid,
data_group,
data_subgroup,
values as value
from vsp_data
join (select distinct periodid, split_part(dhis_data.organisationunitname, ' ', 1) as county from dhis_data ) as dhisperiods on vsp_data.county = dhisperiods.county and  EXTRACT(YEAR FROM vsp_data.period) = EXTRACT(YEAR FROM to_date(dhisperiods.periodid::text, 'YYYYMMDD'))
and vsp_data.khis_uid isnull and vsp_data.data_group in ('Finance')
)

