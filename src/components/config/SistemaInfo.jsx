const LINHAS = (usuario) => [
  ['Aplicativo', 'Mesa Fácil — N2APP'],
  ['Versão', '2.0 (Sprint 2)'],
  ['Usuário logado', usuario?.nome ?? '—'],
  ['E-mail', usuario?.email ?? '—'],
  ['Armazenamento', 'Local (localStorage)'],
  ['Senhas', 'Armazenadas com hash'],
];

export default function SistemaInfo({ usuario }) {
  return (
    <table className="table">
      <tbody>
        {LINHAS(usuario).map(([rotulo, valor]) => (
          <tr key={rotulo}>
            <td>{rotulo}</td>
            <td className="num">{valor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
